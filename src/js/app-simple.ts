import { createApp } from "vue";

// 创建一个简单的测试组件
const TestApp = {
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">
          Dwelin Blog - Vue 测试页面
        </h1>
        
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            基本信息
          </h2>
          <div class="space-y-2">
            <p class="text-gray-600">
              <strong>当前时间:</strong> {{ currentTime }}
            </p>
            <p class="text-gray-600">
              <strong>计数器:</strong> {{ count }}
            </p>
            <p class="text-gray-600">
              <strong>Vue 状态:</strong> <span class="text-green-600">✅ 正常工作</span>
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
            下一步
          </h2>
          <div class="space-y-2">
            <p class="text-gray-600">如果看到这个页面，说明 Vue 应用基本功能正常</p>
            <p class="text-gray-600">接下来可以逐步添加路由、组件等功能</p>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      currentTime: new Date().toLocaleString(),
      count: 0
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

// 创建并挂载应用
const app = createApp(TestApp);
app.mount("#app");

console.log("Dwelin Blog Vue 应用已启动");
