# Dwelin 博客前端项目

这是 Dwelin 个人博客的前端项目，运行在 `dwelin.cn` 域名下。

## 项目结构

```
resources/frontend/
├── assets/          # 静态资源（图片、字体、图标等）
├── components/      # Vue 组件
├── css/            # 样式文件
├── js/             # JavaScript 入口文件
├── pages/          # 页面组件
├── router/         # 路由配置
├── types/          # TypeScript 类型定义
└── App.vue         # 根组件
```

## 开发命令

### 开发模式
```bash
# 启动博客前端开发服务器（端口 5174）
npm run dev:frontend

# 启动后台管理开发服务器（端口 5173）
npm run dev:admin
```

### 构建
```bash
# 构建博客前端项目
npm run build:frontend

# 构建后台管理项目
npm run build:admin

# 构建所有项目
npm run build:all
```

## 技术栈

- **Vue 3** - 前端框架
- **Vue Router** - 路由管理
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Vite** - 构建工具

## 域名配置

- **博客前端**: `dwelin.cn` (端口 5174)
- **后台管理**: `admin.dwelin.cn` (端口 5173)

## 注意事项

1. 两个项目使用不同的端口和输出目录，互不影响
2. 静态资源（如 favicon.ico）已复制到 `resources/frontend/assets/` 目录
3. 使用 `@` 别名指向 `resources/frontend` 目录
4. 构建输出到 `public/frontend-dist` 目录

## 路由配置

博客前端使用 Vue Router 进行路由管理，主要页面包括：
- `/` - 首页
- `/articles` - 文章列表
- `/about` - 关于页面
