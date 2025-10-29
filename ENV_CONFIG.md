# Dwelin Blog 环境配置文件说明

## 📁 环境文件

### 开发环境配置
- **文件**: `env.development`
- **用途**: 开发环境的环境变量配置
- **域名**: `blog.dwelin.me:5174`
- **API**: `dwelin.me/api/v1`

### 生产环境配置
- **文件**: `env.production`
- **用途**: 生产环境的环境变量配置
- **域名**: `blog.dwelin.cn`
- **API**: `dwelin.cn/api/v1`

## 🔧 如何使用

### 1. 开发环境
```bash
# 复制开发环境配置
cp env.development .env

# 启动开发服务器
npm run dev
```

### 2. 生产环境
```bash
# 复制生产环境配置
cp env.production .env

# 构建生产版本
npm run build
```

## 📝 环境变量说明

### 应用配置
- `VITE_APP_TITLE`: 应用标题
- `VITE_APP_VERSION`: 应用版本
- `VITE_APP_DESCRIPTION`: 应用描述

### 域名配置
- `VITE_BLOG_URL`: 博客访问域名
- `VITE_API_URL`: API 接口域名

### 开发服务器配置
- `VITE_DEV_PORT`: 开发服务器端口
- `VITE_DEV_HOST`: 开发服务器主机
- `VITE_DEV_OPEN`: 是否自动打开浏览器
- `VITE_DEV_CORS`: 是否启用 CORS

### 构建配置
- `VITE_BUILD_SOURCEMAP`: 是否生成 sourcemap
- `VITE_BUILD_DROP_CONSOLE`: 是否移除 console
- `VITE_BUILD_DROP_DEBUGGER`: 是否移除 debugger
- `VITE_BUILD_MINIFY`: 是否压缩代码

## 🚀 快速开始

### 开发环境
```bash
# 1. 复制开发环境配置
cp env.development .env

# 2. 启动开发服务器
npm run dev

# 3. 访问应用
# http://localhost:5174/
# http://blog.dwelin.me:5174/
```

### 生产环境
```bash
# 1. 复制生产环境配置
cp env.production .env

# 2. 构建应用
npm run build

# 3. 部署到服务器
# 访问 http://blog.dwelin.cn
```

## ⚠️ 注意事项

1. **环境文件优先级**: `.env` > `env.development` / `env.production`
2. **敏感信息**: 不要在环境文件中存储敏感信息
3. **版本控制**: 环境文件应该加入 `.gitignore`
4. **端口冲突**: 确保开发端口 5174 未被占用

## 🔄 环境切换

### 切换到开发环境
```bash
cp env.development .env
npm run dev
```

### 切换到生产环境
```bash
cp env.production .env
npm run build
```
