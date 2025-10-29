<template>
  <div v-if="article" class="max-w-4xl mx-auto">
    <!-- Article Header -->
    <header class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <router-link to="/articles" class="text-green-600 dark:text-green-400 hover:underline flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回文章列表
        </router-link>
      </div>

      <div class="flex items-center gap-3 mb-4">
        <span class="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
          {{ article?.category_name || "" }}
        </span>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ article?.date || "" }}</span>
      </div>

      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight text-center">
        {{ article?.title || "" }}
      </h1>

      <p class="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        {{ article?.excerpt || "" }}
      </p>

      <div class="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <div class="flex items-center gap-2">
          <span>👁️</span>
          <span>{{ article?.views || 0 }} 次阅读</span>
        </div>
        <div class="flex items-center gap-2">
          <span>💬</span>
          <span>{{ article?.comments || 0 }} 条评论</span>
        </div>
        <div class="flex items-center gap-2">
          <span>⏱️</span>
          <span>{{ readingTime }} 分钟阅读</span>
        </div>
      </div>
    </header>

    <!-- Article Content -->
    <article class="prose prose-lg dark:prose-invert max-w-none mb-12">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="text-center mb-8">
          <img :src="article?.thumbnail_url" alt="文章封面" class="w-full h-64 object-cover rounded-md" />
        </div>
        <div class="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <div v-html="article?.content || ''"></div>
        </div>
      </div>
    </article>

    <!-- Related Articles -->
    <section class="mb-12" v-if="relatedArticles.length > 0">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">相关文章</h2>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="relatedArticle in relatedArticles"
          :key="relatedArticle.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div class="h-32 bg-gradient-to-br from-green-400 to-purple-500 flex items-center justify-center">
            <img :src="relatedArticle.thumbnail_url" alt="相关文章封面" class="w-full h-32 object-cover rounded-md" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {{ relatedArticle.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {{ relatedArticle.excerpt }}
            </p>
            <router-link
              :to="`/articles/${relatedArticle.id}`"
              class="text-green-600 dark:text-green-400 hover:underline text-sm font-medium"
            >
              阅读更多 →
            </router-link>
          </div>
        </article>
      </div>
    </section>

    <!-- Comments Section -->
    <section v-if="article?.comments > 0" class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">评论 ({{ article?.comments || 0 }})</h2>

      <!-- Comment Form -->
      <div class="mb-8">
        <textarea
          v-model="newComment"
          placeholder="写下你的评论..."
          class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          rows="4"
        ></textarea>
        <div class="flex justify-end mt-3">
          <button
            @click="submitComment"
            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            发表评论
          </button>
        </div>
      </div>

      <!-- Comments List -->
      <div class="space-y-6">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-green-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold"
            >
              {{ comment.author?.charAt(0) || "U" }}
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="font-semibold text-gray-900 dark:text-white">{{ comment.author || "匿名用户" }}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(comment.date) }}</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300">{{ comment.content || "" }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Loading State -->
  <div v-else class="max-w-4xl mx-auto text-center py-12">
    <div class="text-6xl mb-4">📝</div>
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">加载中...</h2>
    <p class="text-gray-600 dark:text-gray-300">正在获取文章内容</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { ApiService } from "../config/api";

// 定义类型
interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category_name: string;
  thumbnail_url: string;
  views: number;
  comments: number;
}

interface RelatedArticle {
  id: number;
  title: string;
  excerpt: string;
  thumbnail_url: string;
}

interface ArticleResponse {
  post: Article;
  related_posts: RelatedArticle[];
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// 响应式数据
const route = useRoute();
const article = ref<Article | null>(null);
const relatedArticles = ref<RelatedArticle[]>([]);
const comments = ref<Comment[]>([]);
const newComment = ref("");
const loading = ref(false);
const error = ref("");

// 加载文章
const loadArticle = async () => {
  try {
    loading.value = true;
    error.value = "";
    const response = (await ApiService.getPost(route.params.id as string)) as ApiResponse<ArticleResponse>;
    article.value = response.data.post || null;
    relatedArticles.value = response.data.related_posts || [];
  } catch (err: any) {
    error.value = err.message || "获取文章失败";
  } finally {
    loading.value = false;
  }
};

const readingTime = computed(() => {
  if (!article.value || !article.value.content) return 0;
  const wordsPerMinute = 200;
  const wordCount = article.value.content.length;
  return Math.ceil(wordCount / wordsPerMinute);
});

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch (error) {
    return "";
  }
};

const submitComment = () => {
  if (!newComment.value.trim()) return;

  const comment: Comment = {
    id: Date.now(),
    author: "访客用户",
    content: newComment.value,
    date: new Date().toISOString()
  };

  comments.value.unshift(comment);
  newComment.value = "";

  if (article.value) {
    article.value.comments = (article.value.comments || 0) + 1;
  }
};

onMounted(() => {
  loadArticle();

  // 模拟加载评论
  comments.value = [
    {
      id: 1,
      author: "张三",
      content: "非常详细的文章，学到了很多！",
      date: "2024-01-16T10:30:00Z"
    },
    {
      id: 2,
      author: "李四",
      content: "代码示例很清晰，感谢分享。",
      date: "2024-01-15T15:20:00Z"
    }
  ];
});

// 监听路由参数变化，重新加载文章
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      loadArticle();
      // 清空评论，重新加载
      comments.value = [];
      newComment.value = "";
    }
  }
);
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  @apply text-gray-700 dark:text-gray-300;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3;
}

.prose p {
  @apply mb-4;
}

.prose pre {
  @apply text-sm;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm;
}
</style>
