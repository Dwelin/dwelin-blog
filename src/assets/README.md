# Frontend 静态资源目录

## 目录结构

```
assets/
├── images/          # 图片资源
│   ├── icons/       # 图标文件
│   ├── logos/       # Logo 文件
│   └── backgrounds/ # 背景图片
├── fonts/           # 字体文件
├── icons/           # SVG 图标
└── styles/          # 样式资源
    ├── variables/   # CSS 变量
    └── themes/      # 主题样式
```

## 使用规范

1. **图片资源**：优先使用 WebP 格式，提供 PNG/JPG 作为备选
2. **图标**：优先使用 SVG 格式，支持多色和动画
3. **字体**：使用 woff2 格式，提供 woff 作为备选
4. **命名规范**：使用 kebab-case 命名方式
5. **文件大小**：图片文件建议小于 500KB，字体文件建议小于 1MB 