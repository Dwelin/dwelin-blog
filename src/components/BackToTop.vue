<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
  >
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      :class="{ 'animate-bounce-gentle': showButton }"
      aria-label="回到顶部"
    >
      <!-- 箭头图标 -->
      <svg
        class="w-5 h-5 transform transition-transform duration-300 group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>

      <!-- 工具提示 -->
      <div
        class="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
      >
        回到顶部
      </div>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 响应式数据
const showButton = ref(false);

// 滚动阈值（显示按钮的滚动距离）
const SCROLL_THRESHOLD = 300;

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// 检查滚动位置
const checkScrollPosition = () => {
  showButton.value = window.scrollY > SCROLL_THRESHOLD;
};

// 节流函数
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeoutId) return;
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
};

// 节流后的滚动处理函数
const throttledCheckScroll = throttle(checkScrollPosition, 100);

// 生命周期钩子
onMounted(() => {
  // 添加滚动事件监听器
  window.addEventListener("scroll", throttledCheckScroll, { passive: true });

  // 初始检查
  checkScrollPosition();
});

onUnmounted(() => {
  // 移除滚动事件监听器
  window.removeEventListener("scroll", throttledCheckScroll);
});
</script>

<style scoped>
/* 组件特定样式 */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .back-to-top {
    @apply bg-green-600 hover:bg-green-700;
  }
}

/* 移动端适配 */
@media (max-width: 640px) {
  .back-to-top {
    @apply bottom-4 right-4 p-2.5;
  }

  .back-to-top svg {
    @apply w-4 h-4;
  }
}

/* 无障碍支持 */
@media (prefers-reduced-motion: reduce) {
  .back-to-top {
    transition: none;
  }

  .back-to-top svg {
    transition: none;
  }
}
</style>
