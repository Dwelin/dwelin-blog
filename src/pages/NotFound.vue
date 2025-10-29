<template>
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center">
      <div class="text-8xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">页面未找到</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
        抱歉，您访问的页面不存在。可能是链接错误或页面已被移动。
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          返回首页
        </router-link>
        <router-link
          to="/articles"
          class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
        >
          浏览文章
        </router-link>
      </div>
    </div>
  </div>
</template>
