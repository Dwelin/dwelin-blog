<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">全部文章</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-2">共 {{ totalPosts }} 篇文章</p>
      </div>

      <!-- Search and Filter -->
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章..."
            class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <select
          v-model="selectedCategory"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">全部分类</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Articles Grid -->
    <div v-if="filteredPosts.length > 0 || loading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Loading 骨架屏 -->
      <template v-if="loading">
        <div
          v-for="n in 6"
          :key="`skeleton-${n}`"
          class="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col animate-pulse"
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
            <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div class="flex gap-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 实际文章列表 -->
      <template v-else>
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          class="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
        >
          <div
            class="h-48 bg-gradient-to-br from-green-400 to-purple-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
          >
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
            <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <router-link :to="`/articles/${post.id}`" class="text-green-600 dark:text-green-400 hover:underline font-medium">
                阅读更多 →
              </router-link>
              <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>👁️ {{ post.views }}</span>
                <span>💬 {{ post.comments }}</span>
              </div>
            </div>
          </div>
        </article>
      </template>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMorePosts && !loading && !isLoadingMore" class="flex justify-center">
      <button
        @click="loadMorePosts"
        class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        加载更多
      </button>
    </div>

    <!-- Loading More State -->
    <div v-if="isLoadingMore" class="flex justify-center py-4">
      <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <div
          class="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-green-600 dark:border-t-green-400 rounded-full animate-spin"
        ></div>
        <span>加载更多...</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && filteredPosts.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">📝</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">暂无文章</h3>
      <p class="text-gray-600 dark:text-gray-300">没有找到符合条件的文章</p>
    </div>

    <!-- No More Posts -->
    <div v-if="!hasMorePosts && filteredPosts.length > 0 && !loading" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">已加载全部文章</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { ApiService } from "../config/api";

// 定义类型
interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  excerpt: string;
  thumbnail_url: string;
  date: string;
  category_name: string;
  views: number;
  comments: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

interface ApiPostListResponse<T> {
  list: T;
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

const searchQuery = ref("");
const selectedCategory = ref("");
const loading = ref(false);
const error = ref("");
const posts = ref<Post[]>([]);
const categories = ref<Category[]>([]);
const totalPosts = ref(0);

// 无限滚动相关
const currentPage = ref(1);
const hasMorePosts = ref(true);
const isLoadingMore = ref(false);

// 无限滚动处理
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // 当滚动到距离底部100px时自动加载更多
  if (scrollTop + windowHeight >= documentHeight - 100) {
    if (hasMorePosts.value && !isLoadingMore.value && !loading.value) {
      loadMorePosts();
    }
  }
};

// 加载文章列表
const loadPosts = async (isLoadMore = false) => {
  try {
    if (isLoadMore) {
      isLoadingMore.value = true;
    } else {
      loading.value = true;
    }
    error.value = "";

    const response = (await ApiService.getPosts({
      page: currentPage.value,
      per_page: 6
    })) as ApiResponse<ApiPostListResponse<Post[]>>;

    if (isLoadMore) {
      posts.value.push(...(response.data.list || []));
    } else {
      posts.value = response.data.list || [];
    }

    totalPosts.value = response.data.total || 0;
    hasMorePosts.value = currentPage.value < response.data.last_page;
  } catch (err: any) {
    error.value = err.message || "获取文章列表失败";
  } finally {
    if (isLoadMore) {
      isLoadingMore.value = false;
    } else {
      loading.value = false;
    }
  }
};

// 加载更多文章
const loadMorePosts = async () => {
  if (hasMorePosts.value && !isLoadingMore.value) {
    currentPage.value++;
    await loadPosts(true);
  }
};

// 加载分类列表
const loadCategories = async () => {
  try {
    const response = (await ApiService.getSelectList({ keys: ["categories"] })) as ApiResponse<{
      keys: {
        categories: Category[];
      };
    }>;
    categories.value = response.data.keys.categories;
  } catch (err: any) {
    console.error("获取分类列表失败:", err);
  }
};

const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !selectedCategory.value || post.category_name === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

// 重置搜索和筛选时重新加载数据
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1;
  hasMorePosts.value = true;
  loadPosts();
});

onMounted(() => {
  loadPosts();
  loadCategories();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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
