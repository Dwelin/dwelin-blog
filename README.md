# Dwelin Blog Frontend

Dwelin Blog 前端博客项目，基于 Vue 3 + TypeScript + Tailwind CSS 构建。

## 项目结构

```
dwelin-blog/
├── src/                    # 源代码目录
│   ├── components/        # 公共组件
│   ├── composables/        # 组合式函数
│   ├── layouts/           # 布局组件
│   ├── pages/             # 页面组件
│   ├── stores/            # 状态管理
│   ├── styles/            # 样式文件
│   ├── utils/             # 工具函数
│   ├── App.vue            # 根组件
│   └── app.ts             # 入口文件
├── public/                # 公共资源
├── dist/                  # 构建输出
└── scripts/               # 构建脚本
```

## 技术栈

- **框架**: Vue 3.4+ (Composition API)
- **语言**: TypeScript 5.3+
- **构建工具**: Vite 5.4+
- **状态管理**: Pinia 2.1+
- **路由**: Vue Router 4.2+
- **HTTP 客户端**: Axios 1.6+
- **样式**: Tailwind CSS 3.4+
- **国际化**: Vue I18n 9.8+
- **工具库**: VueUse 10.6+

## 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0
- 现代浏览器支持 ES6+

## 安装步骤

### 1. 克隆项目
```bash
git clone <repository-url> dwelin-blog
cd dwelin-blog
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境配置
```bash
cp .env.development .env
```

### 4. 启动开发服务器
```bash
npm run dev
```

服务将在 `http://localhost:5174` 启动。

## 开发命令

```bash
# 开发环境
npm run dev                 # 启动开发服务器

# 构建
npm run build              # 生产环境构建
npm run preview            # 预览构建结果
npm run build:low-spec     # 低配置环境构建

# 代码质量
npm run lint               # ESLint 检查
npm run format             # Prettier 格式化
npm run type-check         # TypeScript 类型检查
```

## 环境配置

### 开发环境 (.env.development)
```env
# 应用配置
VITE_APP_TITLE=Dwelin Blog
VITE_APP_VERSION=1.0.0

# API 配置
VITE_API_URL=http://localhost:8000/api/v1
VITE_API_TIMEOUT=10000

# 开发配置
VITE_DEV_PORT=5174
VITE_DEV_HOST=0.0.0.0
VITE_DEV_OPEN=true

# 构建配置
VITE_BUILD_SOURCEMAP=false
VITE_BUILD_DROP_CONSOLE=true
VITE_BUILD_DROP_DEBUGGER=true

# 公共路径
VITE_PUBLIC_PATH=/
```

### 生产环境 (.env.production)
```env
# 应用配置
VITE_APP_TITLE=Dwelin Blog
VITE_APP_VERSION=1.0.0

# API 配置
VITE_API_URL=https://dwelin.cn/api/v1
VITE_API_TIMEOUT=10000

# 构建配置
VITE_BUILD_SOURCEMAP=false
VITE_BUILD_DROP_CONSOLE=true
VITE_BUILD_DROP_DEBUGGER=true

# 公共路径
VITE_PUBLIC_PATH=/
```

## 功能特性

### 核心功能
- ✅ 文章列表展示
- ✅ 文章详情阅读
- ✅ 分类筛选
- ✅ 标签筛选
- ✅ 搜索功能
- ✅ 评论系统
- ✅ 用户认证

### 高级功能
- ✅ 响应式设计
- ✅ 暗色主题
- ✅ 国际化支持
- ✅ SEO 优化
- ✅ PWA 支持
- ✅ 文章收藏
- ✅ 阅读历史

### 用户体验
- ✅ 快速加载
- ✅ 平滑滚动
- ✅ 图片懒加载
- ✅ 无限滚动
- ✅ 搜索建议
- ✅ 阅读进度

## 目录说明

### src/components/
公共组件，可复用：
```vue
<!-- src/components/ArticleCard.vue -->
<template>
  <article class="article-card">
    <h2>{{ article.title }}</h2>
    <p>{{ article.excerpt }}</p>
  </article>
</template>
```

### src/pages/
页面组件，按功能组织：
```
pages/
├── HomePage.vue           # 首页
├── ArticlePage.vue        # 文章详情
├── CategoryPage.vue       # 分类页面
├── TagPage.vue           # 标签页面
├── SearchPage.vue        # 搜索页面
├── AboutPage.vue         # 关于页面
└── ContactPage.vue       # 联系页面
```

### src/stores/
状态管理，使用 Pinia：
```typescript
// src/stores/article.ts
export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [],
    currentArticle: null,
    loading: false,
  }),
  actions: {
    async fetchArticles() {
      // 获取文章列表
    },
    async fetchArticle(id: string) {
      // 获取文章详情
    },
  },
});
```

### src/composables/
组合式函数，逻辑复用：
```typescript
// src/composables/useApi.ts
export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const request = async (url: string, options?: RequestInit) => {
    loading.value = true
    try {
      const response = await fetch(url, options)
      return await response.json()
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, request }
}
```

## 样式系统

### Tailwind CSS 配置
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
```

### 自定义样式
```scss
// src/styles/main.scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

// 自定义组件样式
@layer components {
  .article-card {
    @apply bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow;
  }
  
  .btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors;
  }
}
```

## 路由配置

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('@/pages/ArticlePage.vue'),
    props: true
  },
  {
    path: '/category/:slug',
    name: 'Category',
    component: () => import('@/pages/CategoryPage.vue'),
    props: true
  },
  {
    path: '/tag/:slug',
    name: 'Tag',
    component: () => import('@/pages/TagPage.vue'),
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/pages/SearchPage.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
```

## 状态管理

```typescript
// src/stores/index.ts
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
```

## 构建优化

### 代码分割
```typescript
// vite.config.ts
manualChunks(id) {
  if (id.includes("node_modules")) {
    if (id.includes("vue")) return "vue-vendor";
    if (id.includes("axios")) return "axios-vendor";
    return "vendor";
  }
}
```

### 资源优化
```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        const info = assetInfo.name.split('.')
        const ext = info[info.length - 1]
        if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name)) {
          return `assets/images/[name]-[hash][extname]`
        }
        if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
          return `assets/fonts/[name]-[hash][extname]`
        }
        return `assets/[ext]/[name]-[hash][extname]`
      }
    }
  }
}
```

## 部署

### 静态部署
```bash
# 构建
npm run build

# 部署到 Nginx
cp -r dist/* /var/www/html/blog/
```

### Docker 部署
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx 配置
```nginx
server {
    listen 80;
    server_name blog.dwelin.cn;
    root /var/www/html/blog;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## SEO 优化

### Meta 标签
```vue
<!-- src/components/HeadMeta.vue -->
<template>
  <Head>
    <title>{{ title }}</title>
    <meta name="description" :content="description" />
    <meta property="og:title" :content="title" />
    <meta property="og:description" :content="description" />
    <meta property="og:image" :content="image" />
  </Head>
</template>
```

### 结构化数据
```typescript
// src/utils/seo.ts
export function generateArticleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "author": {
      "@type": "Person",
      "name": article.author.name
    },
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt
  }
}
```

## 性能优化

### 图片优化
```vue
<template>
  <img
    :src="imageSrc"
    :alt="alt"
    loading="lazy"
    @load="onImageLoad"
    @error="onImageError"
  />
</template>
```

### 虚拟滚动
```vue
<template>
  <VirtualList
    :items="articles"
    :item-height="200"
    :container-height="600"
  >
    <template #default="{ item }">
      <ArticleCard :article="item" />
    </template>
  </VirtualList>
</template>
```

## 测试

```bash
# 运行测试
npm run test

# 测试覆盖率
npm run test:coverage

# E2E 测试
npm run test:e2e
```

## 开发规范

### 组件规范
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 导入
import { ref, computed } from 'vue'

// 接口定义
interface Props {
  title: string
  visible: boolean
}

// Props 定义
const props = withDefaults(defineProps<Props>(), {
  visible: false
})

// Emits 定义
const emit = defineEmits<{
  close: []
  confirm: [value: string]
}>()

// 响应式数据
const loading = ref(false)

// 计算属性
const isVisible = computed(() => props.visible)

// 方法
const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
/* 样式内容 */
</style>
```

### 样式规范
- 优先使用 Tailwind CSS 类
- 自定义样式使用 SCSS
- 组件样式使用 scoped
- 全局样式放在 styles/ 目录

## 故障排除

### 常见问题

1. **构建失败**
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **TypeScript 类型错误**
```bash
npm run type-check
```

3. **样式不生效**
```bash
npm run build
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

- 项目链接: [https://github.com/Dwelin/dwelin-blog](https://github.com/Dwelin/dwelin-blog)
- 问题反馈: [https://github.com/Dwelin/dwelin-blog/issues](https://github.com/Dwelin/dwelin-blog/issues)
