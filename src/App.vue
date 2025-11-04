<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <Navbar />
    <main class="container mx-auto pt-4 pb-8 max-w-screen-xl">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8">
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="flex flex-col items-center justify-between gap-4">
          <div class="text-center">
            <p class="text-gray-600 dark:text-gray-300 mb-2">愿你有前进一寸的勇气，亦有后退一尺的从容</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Dwelin © 2025 |
              <img src="https://www.gov.cn/images/2018guohui03.png" class="inline-block w-4 h-4 mb-1" />粤ICP备2022117022号
            </p>
          </div>
        </div>
      </div>
    </footer>

    <!-- 回到顶部按钮 -->
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import BackToTop from "./components/BackToTop.vue";
</script>

<style>
/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Focus styles */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Selection styles */
::selection {
  background: #3b82f6;
  color: white;
}

.dark ::selection {
  background: #60a5fa;
  color: white;
}
</style>
