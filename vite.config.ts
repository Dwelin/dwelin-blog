import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  // 加载环境变量文件
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === "production";
  
  // 从环境变量获取配置
  const blogDomain = env.VITE_BLOG_URL || (isProduction ? "http://blog.dwelin.cn" : "http://blog.dwelin.me:5174");
  const apiUrl = env.VITE_API_URL || (isProduction ? "http://dwelin.cn/api/v1" : "http://dwelin.me/api/v1");
  const devPort = parseInt(env.VITE_DEV_PORT || "5174");
  
  return {
    plugins: [
      vue(),
      // 自定义域名显示插件
      {
        name: "custom-domain-display",
        configureServer(server) {
          // 在服务器启动时显示域名信息
          setTimeout(() => {
            console.log(`\n🎯 自定义域名访问地址:`);
            console.log(` ➜ Blog: \x1b[36m\x1b[4m${blogDomain}/\x1b[0m`);
            console.log(` ➜ Local: \x1b[36m\x1b[4mhttp://localhost:${devPort}/\x1b[0m`);
            console.log(` ➜ Network: \x1b[36m\x1b[4mhttp://192.168.3.55:${devPort}/\x1b[0m`);
            console.log(`\n💡 提示: 在支持的终端中，这些链接是可点击的！`);
            console.log(`\n`);
          }, 1000);
        },
      },
    ],
    root: ".",
    base: "/",
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      host: env.VITE_DEV_HOST || "0.0.0.0",
      port: devPort,
      strictPort: true,
      cors: env.VITE_DEV_CORS !== "false",
      origin: blogDomain,
      hmr: {
        host: blogDomain.replace(/^https?:\/\//, "").replace(/:\d+$/, ""),
        protocol: "http",
        clientPort: devPort
      },
      // API 代理配置
      proxy: {
        "/api": {
          target: "http://dwelin.me",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, "/api")
        }
      }
    },
    build: {
      outDir: "dist",
      minify: env.VITE_BUILD_MINIFY === "true" ? "esbuild" : false,
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      manifest: true,
      rollupOptions: {
        cache: true,
        maxParallelFileOps: 2,
        input: resolve(__dirname, "index.html"),
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("vue")) {
                return "vue-vendor";
              }
              return "vendor";
            }
          }
        }
      }
    },
    publicDir: "public",
    optimizeDeps: {
      include: ["vue", "vue-router", "highlight.js"],
      force: false
    }
  };
});
