/**
 * 环境配置管理器
 * 根据 NODE_ENV 自动切换开发环境和生产环境配置
 */

// 判断当前环境
const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
const isProd = process.env.NODE_ENV === 'production';

// 通用配置
const commonConfig = {
  // 应用配置
  VITE_APP_TITLE: 'Dwelin Blog',
  VITE_APP_VERSION: '1.0.0',
  VITE_APP_DESCRIPTION: 'Dwelin Blog 前端应用',
  
  // 公共路径
  VITE_PUBLIC_PATH: '/',
};

// 开发环境配置
const devConfig = {
  ...commonConfig,
  
  // 域名配置
  VITE_BLOG_URL: 'http://blog.dwelin.me:5174',
  VITE_API_URL: 'http://dwelin.me/api/v1',
  
  // 开发服务器配置
  VITE_DEV_PORT: 5174,
  VITE_DEV_HOST: '0.0.0.0',
  VITE_DEV_OPEN: true,
  VITE_DEV_CORS: true,
  
  // 构建配置
  VITE_BUILD_SOURCEMAP: true,
  VITE_BUILD_DROP_CONSOLE: false,
  VITE_BUILD_DROP_DEBUGGER: false,
  VITE_BUILD_MINIFY: false,
};

// 生产环境配置
const prodConfig = {
  ...commonConfig,
  
  // 域名配置
  VITE_BLOG_URL: 'https://blog.dwelin.cn',
  VITE_API_URL: 'https://dwelin.cn/api/v1',
  
  // 构建配置
  VITE_BUILD_SOURCEMAP: false,
  VITE_BUILD_DROP_CONSOLE: true,
  VITE_BUILD_DROP_DEBUGGER: true,
  VITE_BUILD_MINIFY: true,
};

// 根据环境返回配置
const config = isDev ? devConfig : prodConfig;

module.exports = config;

