<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        API 测试页面
      </h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          环境信息
        </h2>
        <div class="space-y-2">
          <p class="text-gray-600 dark:text-gray-300">
            <strong>当前环境:</strong> {{ isDev ? '开发环境' : '生产环境' }}
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            <strong>API 基础 URL:</strong> {{ apiBaseUrl }}
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            <strong>请求目标:</strong> {{ isDev ? '通过 Vite 代理到 dwelin.me' : '直接访问 dwelin.cn' }}
          </p>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          API 测试
        </h2>
        <div class="space-y-4">
          <button 
            @click="testStats"
            :disabled="loading"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {{ loading ? '请求中...' : '测试统计接口' }}
          </button>
          
          <button 
            @click="testPosts"
            :disabled="loading"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 ml-4"
          >
            {{ loading ? '请求中...' : '测试文章接口' }}
          </button>
        </div>
        
        <div v-if="apiResult" class="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">API 响应:</h3>
          <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-auto">{{ apiResult }}</pre>
        </div>
        
        <div v-if="error" class="mt-6 p-4 bg-red-100 dark:bg-red-900 rounded-lg">
          <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">错误信息:</h3>
          <p class="text-sm text-red-700 dark:text-red-300">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ApiService, apiConfig } from "../config/api";

const loading = ref(false);
const apiResult = ref("");
const error = ref("");

const isDev = computed(() => import.meta.env.DEV);
const apiBaseUrl = computed(() => apiConfig.getApiUrl());

const testStats = async () => {
  try {
    loading.value = true;
    error.value = "";
    const response = await ApiService.getStats();
    apiResult.value = JSON.stringify(response, null, 2);
  } catch (err: any) {
    error.value = err.message || "请求失败";
    apiResult.value = "";
  } finally {
    loading.value = false;
  }
};

const testPosts = async () => {
  try {
    loading.value = true;
    error.value = "";
    const response = await ApiService.getPosts({ page: 1, per_page: 5 });
    apiResult.value = JSON.stringify(response, null, 2);
  } catch (err: any) {
    error.value = err.message || "请求失败";
    apiResult.value = "";
  } finally {
    loading.value = false;
  }
};
</script>
