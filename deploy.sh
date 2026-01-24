#!/bin/bash

# Dwelin Blog 安全部署脚本（解决：发布过程中 index.html 与 assets 版本不一致）
#
# ✅ 关键策略：
# - 先同步 dist/assets/（不删除旧 hash 资源）
# - 最后原子替换 dist/index.html（避免 index 指向的 css/js 尚未上传完成）
#
# 使用方式：
# - 仅构建：./deploy.sh
# - 构建并部署到服务器目录（在服务器上执行）：DEPLOY_DIR=/var/www/html/dwelin/dwelin-blog/dist ./deploy.sh
#
# 可选：
# - 跳过构建，仅部署当前 dist：SKIP_BUILD=1 ./deploy.sh
# - 部署后尝试 reload nginx：RELOAD_NGINX=1 ./deploy.sh
#
# 注意：如果你使用了 CDN，仍然建议对 / 或 /index.html 做刷新（purge/refresh）。

set -euo pipefail

info() { echo "[INFO] $*"; }
warn() { echo "[WARN] $*"; }
err() { echo "[ERROR] $*" >&2; }

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

DIST_DIR="${SCRIPT_DIR}/dist"
DEPLOY_DIR="${DEPLOY_DIR:-}"
SKIP_BUILD="${SKIP_BUILD:-0}"
RELOAD_NGINX="${RELOAD_NGINX:-0}"

check_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    err "$cmd 未安装"
    exit 1
  fi
}

assert_dist_consistent() {
  if [ ! -f "${DIST_DIR}/index.html" ]; then
    err "构建产物缺少 dist/index.html"
    exit 1
  fi
  if [ ! -d "${DIST_DIR}/assets" ]; then
    err "构建产物缺少 dist/assets/"
    exit 1
  fi

  # 校验：index.html 里引用的 /assets/... 都必须存在
  local missing=0
  while IFS= read -r asset; do
    [ -z "$asset" ] && continue
    local rel="${asset#/}" # strip leading '/'
    if [ ! -f "${DIST_DIR}/${rel}" ]; then
      err "dist/index.html 引用了不存在的文件：${asset}"
      missing=1
    fi
  done < <(sed -nE 's/.*(href|src)="(\/assets\/[^"]+)".*/\2/p' "${DIST_DIR}/index.html" | sort -u)

  if [ "$missing" -ne 0 ]; then
    err "构建产物不一致：请检查构建/上传流程（常见原因：发布中断、dist 没有完整同步）"
    exit 1
  fi
}

safe_sync() {
  local src="$1"
  local dst="$2"
  mkdir -p "$dst"

  if command -v rsync >/dev/null 2>&1; then
    # 默认不 --delete：保留旧 hash 资源，避免客户端/缓存命中旧 index 时 404
    rsync -a "${src}/" "${dst}/"
  else
    warn "rsync 不存在，使用 cp -R（会更慢）"
    cp -R "${src}/." "${dst}/"
  fi
}

atomic_copy_file() {
  local src="$1"
  local dst="$2"
  local tmp="${dst}.new"
  cp "$src" "$tmp"
  mv -f "$tmp" "$dst"
}

info "🚀 开始部署 Dwelin Blog..."

if [ "$SKIP_BUILD" != "1" ]; then
  check_cmd node
  check_cmd npm
  info "📦 安装依赖（npm ci）..."
  npm ci --production=false
  info "🔨 构建项目..."
  npm run build
else
  info "⏭️ SKIP_BUILD=1：跳过构建，直接使用当前 dist/"
fi

assert_dist_consistent
info "✅ dist 构建产物校验通过"

if [ -z "$DEPLOY_DIR" ]; then
  warn "未设置 DEPLOY_DIR：仅完成构建与校验。"
  echo ""
  echo "如需部署到服务器目录："
  echo "  DEPLOY_DIR=/var/www/html/dwelin/dwelin-blog/dist ./deploy.sh"
  exit 0
fi

info "📤 部署目录：${DEPLOY_DIR}"
mkdir -p "$DEPLOY_DIR"

info "1/3 同步 assets（先上传静态资源，避免 index 引用 404）..."
safe_sync "${DIST_DIR}/assets" "${DEPLOY_DIR}/assets"

info "2/3 同步 dist 根目录除 index.html 外的文件（若有）..."
shopt -s nullglob
for item in "${DIST_DIR}"/*; do
  base="$(basename "$item")"
  if [ "$base" = "assets" ] || [ "$base" = "index.html" ]; then
    continue
  fi
  if [ -d "$item" ]; then
    safe_sync "$item" "${DEPLOY_DIR}/${base}"
  else
    atomic_copy_file "$item" "${DEPLOY_DIR}/${base}"
  fi
done
shopt -u nullglob

info "3/3 原子替换 index.html（最后更新入口，避免版本不一致）..."
atomic_copy_file "${DIST_DIR}/index.html" "${DEPLOY_DIR}/index.html"

# 写入部署元信息，便于线上排查“到底命中哪个版本”
DEPLOY_TS="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
GIT_SHA="unknown"
if command -v git >/dev/null 2>&1; then
  GIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
fi
cat > "${DEPLOY_DIR}/.deploy-meta.json" <<EOF
{"deployed_at":"${DEPLOY_TS}","git":"${GIT_SHA}"}
EOF

info "🎉 部署完成：assets 已先行同步，index.html 已最后原子替换。"

if [ "$RELOAD_NGINX" = "1" ]; then
  if command -v nginx >/dev/null 2>&1; then
    info "♻️ 尝试 reload nginx（需要权限）..."
    nginx -t
    # 兼容无 systemd 环境：优先 nginx -s reload
    if nginx -s reload 2>/dev/null; then
      info "nginx reload 成功（nginx -s reload）"
    else
      warn "nginx -s reload 失败，尝试 systemctl reload nginx（可能需要 sudo）"
      systemctl reload nginx
      info "nginx reload 成功（systemctl reload nginx）"
    fi
  else
    warn "nginx 命令不存在，跳过 reload"
  fi
fi
