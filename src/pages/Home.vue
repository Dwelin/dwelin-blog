<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="text-center py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8">
          <!-- 根据主题动态切换SVG -->
          <div
            class="mx-auto mb-6 shadow-lg border-4 border-white dark:border-gray-900 overflow-hidden bg-white dark:bg-gray-900"
          >
            <img
              v-if="!isDark"
              src="../assets/images/svgs/snake-Light.svg"
              alt="GitHub Contributions - Light"
              class="w-full h-full object-cover"
            />
            <img
              v-else
              src="../assets/images/svgs/snake-Dark.svg"
              alt="GitHub Contributions - Dark"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <!-- <h1 class="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          欢迎来到 <span class="text-green-600 dark:text-green-400">Dwelin</span> 的博客
        </h1> -->
        <!-- <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          愿你有前进一寸的勇气，亦有后退一尺的从容...
        </p> -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/articles"
            class="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            浏览文章
          </router-link>
          <router-link
            to="/about"
            class="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            了解更多
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Articles -->
    <section class="py-12">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">最新文章</h2>
          <router-link to="/articles" class="text-green-600 dark:text-green-400 hover:underline font-medium">
            查看全部 →
          </router-link>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Loading 骨架屏 -->
          <template v-if="loading">
            <div
              v-for="n in 3"
              :key="n"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse flex flex-col"
            >
              <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div class="p-6 flex-1 flex flex-col">
                <div class="flex items-center gap-2 mb-3">
                  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                </div>
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 flex-1"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
              </div>
            </div>
          </template>

          <!-- 文章列表 -->
          <template v-else>
            <article
              v-for="post in posts"
              :key="post.id"
              class="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
            >
              <div class="h-48 bg-gradient-to-br from-green-400 to-purple-500 flex items-center justify-center">
                <img :src="post.thumbnail_url" alt="thumbnail" class="w-full h-full object-cover" />
              </div>
              <div class="p-6 flex-1 flex flex-col">
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
                  <span class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                    {{ post.category_name }}
                  </span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-1">
                  {{ post.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
                  {{ post.excerpt }}
                </p>
                <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <router-link
                    :to="`/articles/${post.id}`"
                    class="text-green-600 dark:text-green-400 hover:underline font-medium"
                  >
                    阅读更多 →
                  </router-link>
                </div>
              </div>
            </article>
          </template>

          <!-- 空状态 -->
          <div v-if="!loading && posts.length === 0" class="col-span-full text-center py-12">
            <div class="text-gray-500 dark:text-gray-400">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              <p class="text-lg font-medium">暂无文章</p>
              <p class="text-sm">稍后再来看看吧</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800/50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="space-y-2">
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">{{ stats.total_posts }}</div>
            <div class="text-gray-600 dark:text-gray-300">发布文章</div>
          </div>
          <div class="space-y-2">
            <div class="text-4xl font-bold text-green-600 dark:text-green-400">{{ stats.total_views }}</div>
            <div class="text-gray-600 dark:text-gray-300">总浏览量</div>
          </div>
          <div class="space-y-2">
            <div class="text-4xl font-bold text-purple-600 dark:text-purple-400">{{ stats.total_tags }}</div>
            <div class="text-gray-600 dark:text-gray-300">标签总数</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ApiService } from "../config/api";

// 检测当前主题
const isDark = ref(false);

const updateTheme = () => {
  if (typeof window !== "undefined") {
    isDark.value = document.documentElement.classList.contains("dark");
  }
};

// 监听主题变化
const observeThemeChanges = () => {
  if (typeof window !== "undefined") {
    // 监听 class 变化
    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    // 初始检测
    updateTheme();
  }
};

// 定义类型
interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category_name: string;
  thumbnail_url: string;
}

interface Stats {
  total_posts: number;
  total_views: number;
  total_tags: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// 响应式数据
const loading = ref(false);
const error = ref("");
const posts = ref<Post[]>([]);
const stats = ref<Stats>({
  total_posts: 0,
  total_views: 0,
  total_tags: 0
});

// 加载热门文章
const loadPopularPosts = async () => {
  try {
    loading.value = true;
    error.value = "";
    const response = (await ApiService.getPopularPosts()) as ApiResponse<Post[]>;
    posts.value = response.data || [];
  } catch (err: any) {
    error.value = err.message || "获取热门文章失败";
  } finally {
    loading.value = false;
  }
};

// 加载统计信息
const loadStats = async () => {
  try {
    const response = (await ApiService.getStats()) as ApiResponse<Stats>;
    stats.value = response.data || {
      total_posts: 0,
      total_views: 0,
      total_tags: 0
    };
  } catch (error) {
    console.error("获取统计信息失败:", error);
  }
};

// 页面加载时获取统计信息
onMounted(() => {
  loadStats();
  loadPopularPosts();
  observeThemeChanges();
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 骨架屏动画 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
