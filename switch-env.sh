#!/bin/bash

# 环境切换脚本
# 用法: ./switch-env.sh [dev|prod]

set -e

ENV=${1:-dev}

if [ "$ENV" = "dev" ]; then
    echo "切换到开发环境..."
    cat > .env << 'EOF'
# 开发环境配置
VITE_API_URL=http://dwelin.me/api/v1
VITE_DEV_PORT=5174
VITE_DEBUG=true
VITE_BUILD_SOURCEMAP=true
EOF
    echo "✅ 已切换到开发环境"
elif [ "$ENV" = "prod" ]; then
    echo "切换到生产环境..."
    cat > .env << 'EOF'
# 生产环境配置
VITE_API_URL=https://dwelin.cn/api/v1
VITE_BUILD_SOURCEMAP=false
VITE_BUILD_DROP_CONSOLE=true
VITE_DEBUG=false
EOF
    echo "✅ 已切换到生产环境"
else
    echo "❌ 未知环境: $ENV"
    echo "用法: ./switch-env.sh [dev|prod]"
    exit 1
fi

echo "当前环境: $ENV"
exit 0

