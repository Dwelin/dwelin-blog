import { createApp } from "vue";

console.log("开始加载 Vue 应用...");

// 创建一个简单的测试组件，不依赖其他文件
const TestComponent = {
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">
          Dwelin Blog - 调试页面
        </h1>
        
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            调试信息
          </h2>
          <div class="space-y-2">
            <p class="text-gray-600">
              <strong>当前时间:</strong> {{ currentTime }}
            </p>
            <p class="text-gray-600">
              <strong>计数器:</strong> {{ count }}
            </p>
            <p class="text-gray-600">
              <strong>Vue 版本:</strong> {{ vueVersion }}
            </p>
          </div>
          
          <button 
            @click="count++"
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            点击计数: {{ count }}
          </button>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            状态检查
          </h2>
          <div class="space-y-2">
            <p class="text-green-600">✅ Vue 3 正常工作</p>
            <p class="text-green-600">✅ 响应式数据正常工作</p>
            <p class="text-green-600">✅ 事件处理正常工作</p>
            <p class="text-green-600">✅ Tailwind CSS 正常工作</p>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      currentTime: new Date().toLocaleString(),
      count: 0,
      vueVersion: "3.4.0"
    };
  },
  mounted() {
    console.log('Vue 应用已挂载');
    // 更新当前时间
    setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
  }
};

console.log("创建 Vue 应用...");

// 创建并挂载应用
const app = createApp(TestComponent);

console.log("挂载 Vue 应用...");

app.mount("#app");

console.log("Dwelin Blog Vue 应用启动完成");
