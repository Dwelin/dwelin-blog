#!/bin/bash

# Dwelin Blog 部署脚本
# 用于构建和部署到 nginx

echo "🚀 开始部署 Dwelin Blog..."

# 检查 Node.js 环境
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

# 检查 npm 环境
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

# 进入项目目录
cd "$(dirname "$0")"

echo "📦 安装依赖..."
npm install

echo "🔨 构建项目..."
npm run build

# 检查构建是否成功
if [ ! -d "dist" ]; then
    echo "❌ 构建失败，dist 目录不存在"
    exit 1
fi

echo "✅ 构建完成！"

# 显示构建结果
echo "📁 构建文件："
ls -la dist/

echo ""
echo "🌐 部署信息："
echo "   - 网站根目录: $(pwd)/dist"
echo "   - 入口文件: $(pwd)/dist/index.html"
echo "   - 域名: blog.dwelin.cn"
echo "   - 端口: 80"

echo ""
echo "📝 Nginx 配置示例："
echo "   server {"
echo "       listen 80;"
echo "       server_name blog.dwelin.cn;"
echo "       root $(pwd)/dist;"
echo "       index index.html;"
echo "       location / {"
echo "           try_files \$uri \$uri/ /index.html;"
echo "       }"
echo "   }"

echo ""
echo "🎉 部署准备完成！"
echo "   请将 nginx.conf 文件复制到 nginx 配置目录"
echo "   并重启 nginx 服务"
