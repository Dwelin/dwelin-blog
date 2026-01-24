#!/bin/bash

# Dwelin Blog 生产环境构建部署脚本
# 用于构建和部署博客前端到生产环境

set -e  # 遇到错误立即退出

echo "🚀 开始构建 Dwelin Blog 博客前端..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 进入项目目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

log_info "项目目录: $SCRIPT_DIR"

# 检查 Node.js 环境
if ! command -v node &> /dev/null; then
    log_error "Node.js 未安装，请先安装 Node.js"
    exit 1
fi

NODE_VERSION=$(node -v)
log_info "Node.js 版本: $NODE_VERSION"

# 检查 npm 环境
if ! command -v npm &> /dev/null; then
    log_error "npm 未安装，请先安装 npm"
    exit 1
fi

NPM_VERSION=$(npm -v)
log_info "npm 版本: $NPM_VERSION"

# 检查环境配置文件
if [ ! -f ".env.production" ]; then
    log_warning "生产环境配置文件不存在"
    if [ -f "env.production" ]; then
        log_info "使用 env.production 文件..."
        cp env.production .env
    fi
fi

# 清理之前的构建
if [ -d "dist" ]; then
    log_info "清理之前的构建文件..."
    rm -rf dist
fi

# 安装依赖
log_info "安装依赖..."
npm ci --production=false

# 构建项目
log_info "构建项目..."
npm run build

# 检查构建是否成功
if [ ! -d "dist" ]; then
    log_error "构建失败，dist 目录不存在"
    exit 1
fi

# 检查构建产物
BUILD_SIZE=$(du -sh dist | cut -f1)
log_success "构建完成！构建产物大小: $BUILD_SIZE"

# 构建产物一致性校验：index.html 引用的 /assets/... 必须存在
log_info "校验构建产物一致性（index.html 引用资源必须存在）..."
if [ ! -f "dist/index.html" ]; then
    log_error "dist/index.html 不存在"
    exit 1
fi

MISSING=0
while IFS= read -r asset; do
    [ -z "$asset" ] && continue
    REL="${asset#/}" # strip leading '/'
    if [ ! -f "dist/$REL" ]; then
        log_error "index.html 引用了不存在的文件：$asset"
        MISSING=1
    fi
done < <(sed -nE 's/.*(href|src)="(\/assets\/[^"]+)".*/\2/p' dist/index.html | sort -u)

if [ "$MISSING" -ne 0 ]; then
    log_error "构建产物不一致：请检查构建/上传流程（常见原因：发布中断或 dist 未完整同步）"
    exit 1
fi

log_success "构建产物一致性校验通过"

# 输出一个可追踪的版本信息文件，便于线上排查“命中哪个版本”
BUILD_TS="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
GIT_SHA="unknown"
if command -v git &> /dev/null; then
    GIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
fi
cat > dist/.build-meta.json <<EOF
{"built_at":"${BUILD_TS}","git":"${GIT_SHA}"}
EOF

# 显示构建结果
echo ""
log_info "构建产物详情："
ls -lh dist/ | head -10

echo ""
log_success "🎉 Dwelin Blog 构建完成！"
echo ""
log_info "部署信息："
echo "   - 项目目录: $SCRIPT_DIR"
echo "   - 构建目录: $SCRIPT_DIR/dist"
echo "   - 入口文件: dist/index.html"
echo "   - 域名: blog.dwelin.cn"
echo "   - 端口: 443 (HTTPS)"
echo ""
log_info "Nginx 配置示例："
cat << 'EOF'
   server {
       listen 443 ssl http2;
       server_name blog.dwelin.cn;
       root /path/to/dwelin-blog/dist;
       index index.html;

       # SSL 证书配置
       ssl_certificate /path/to/cert/blog.dwelin.cn.crt;
       ssl_certificate_key /path/to/cert/blog.dwelin.cn.key;
       
       # 静态资源缓存
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # 单页应用路由
       location / {
           try_files $uri $uri/ /index.html;
       }

       # API 代理
       location /api/ {
           proxy_pass http://localhost:8000/api/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
EOF
echo ""
log_info "下一步："
echo "   1. 将构建产物部署到服务器"
echo "   2. 配置 Nginx 反向代理"
echo "   3. 配置 SSL 证书"
echo "   4. 重启 Nginx 服务"

