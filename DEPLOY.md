# Dwelin Blog 部署指南

## 📁 项目结构

```
dwelin-blog/
├── dist/                    # 构建输出目录 (nginx 根目录)
│   ├── index.html          # 入口文件
│   ├── assets/             # 静态资源
│   │   ├── css/           # CSS 文件
│   │   ├── js/            # JavaScript 文件
│   │   ├── ico/           # 图标文件
│   │   └── svg/           # SVG 文件
│   └── .vite/             # Vite 构建信息
├── nginx.conf              # Nginx 配置文件
├── deploy.sh               # 部署脚本
└── ...
```

## 🚀 快速部署

### 1. 构建项目
```bash
cd /Users/dwelin/Sites/dwelin/dwelin-blog
npm install
npm run build
```

### 2. 配置 Nginx
```bash
# 复制配置文件
sudo cp nginx.conf /etc/nginx/sites-available/dwelin-blog
sudo ln -s /etc/nginx/sites-available/dwelin-blog /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 3. 使用部署脚本
```bash
./deploy.sh
```

## 🔧 Nginx 配置说明

### 关键配置项
- **listen 80**: HTTP 端口
- **server_name blog.dwelin.cn**: 域名
- **root /Users/dwelin/Sites/dwelin/dwelin-blog/dist**: 网站根目录
- **index index.html**: 默认入口文件

### 功能特性
- ✅ SPA 路由支持 (`try_files $uri $uri/ /index.html`)
- ✅ 静态资源缓存 (1年)
- ✅ Gzip 压缩
- ✅ API 代理 (`/api/` → `http://dwelin.cn/api/`)
- ✅ 安全头设置
- ✅ 敏感文件保护

## 📝 环境变量

### 开发环境 (.env.development)
```env
VITE_BLOG_URL=http://blog.dwelin.me:5174
VITE_API_URL=http://dwelin.me/api/v1
```

### 生产环境 (.env.production)
```env
VITE_BLOG_URL=http://blog.dwelin.cn
VITE_API_URL=http://dwelin.cn/api/v1
```

## 🌐 访问地址

- **开发环境**: http://blog.dwelin.me:5174
- **生产环境**: http://blog.dwelin.cn

## 🔍 故障排除

### 1. 构建失败
```bash
# 清理缓存
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 2. Nginx 配置错误
```bash
# 测试配置
sudo nginx -t

# 查看错误日志
sudo tail -f /var/log/nginx/error.log
```

### 3. 权限问题
```bash
# 设置正确的文件权限
sudo chown -R www-data:www-data /Users/dwelin/Sites/dwelin/dwelin-blog/dist
sudo chmod -R 755 /Users/dwelin/Sites/dwelin/dwelin-blog/dist
```

## 📊 性能优化

- **静态资源缓存**: 1年过期时间
- **Gzip 压缩**: 减少传输大小
- **资源预加载**: 关键资源预连接
- **代码分割**: Vue 和业务代码分离

## 🔒 安全配置

- **X-Frame-Options**: 防止点击劫持
- **X-Content-Type-Options**: 防止 MIME 类型嗅探
- **X-XSS-Protection**: XSS 保护
- **敏感文件保护**: 禁止访问 .env、.log 等文件
