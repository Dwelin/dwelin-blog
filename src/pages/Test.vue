<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Dwelin Blog - 测试页面
      </h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          基本信息
        </h2>
        <div class="space-y-2">
          <p class="text-gray-600 dark:text-gray-300">
            <strong>当前时间:</strong> {{ currentTime }}
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            <strong>Vue 版本:</strong> {{ vueVersion }}
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            <strong>主题模式:</strong> {{ isDark ? '深色' : '浅色' }}
          </p>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          功能测试
        </h2>
        <div class="space-y-4">
          <button 
            @click="count++"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            点击计数: {{ count }}
          </button>
          
          <button 
            @click="toggleTheme"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ml-4"
          >
            切换主题
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          API 测试
        </h2>
        <div class="space-y-4">
          <button 
            @click="testApi"
            :disabled="loading"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {{ loading ? '测试中...' : '测试 API' }}
          </button>
          
          <div v-if="apiResult" class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <pre class="text-sm text-gray-800 dark:text-gray-200">{{ apiResult }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { version } from "vue";
import { ApiService } from "../config/api";

const currentTime = ref(new Date().toLocaleString());
const vueVersion = ref(version);
const isDark = ref(false);
const count = ref(0);
const loading = ref(false);
const apiResult = ref("");

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const testApi = async () => {
  try {
    loading.value = true;
    const response = await ApiService.getStats();
    apiResult.value = JSON.stringify(response, null, 2);
  } catch (error: any) {
    apiResult.value = `错误: ${error.message}`;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  // 更新当前时间
  setInterval(() => {
    currentTime.value = new Date().toLocaleString();
  }, 1000);
  
  // 检查主题
  isDark.value = document.documentElement.classList.contains("dark");
});
</script>
