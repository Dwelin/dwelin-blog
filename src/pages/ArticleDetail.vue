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

      <p class="text-base text-gray-600 dark:text-gray-300 mb-6 leading-loose">
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
        <div class="space-y-6 text-gray-700 dark:text-gray-300 leading-loose">
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
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { ApiService } from "../config/api";
// 导入代码高亮样式，根据主题选择
import "highlight.js/styles/github-dark.css";
// 备用：如果需要浅色主题，可以使用 github.css

// 动态导入 highlight.js 以避免构建时的解析问题
let hljs: any = null;
const loadHighlightJs = async () => {
  if (!hljs) {
    try {
      const hljsModule = await import("highlight.js");
      hljs = hljsModule.default || hljsModule;
    } catch (error) {
      console.error("加载 highlight.js 失败:", error);
    }
  }
  return hljs;
};

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

// 复制代码到剪贴板
const copyCode = async (codeText: string, button: HTMLElement) => {
  try {
    await navigator.clipboard.writeText(codeText);
    
    // 保存原始样式和内容
    const originalHTML = button.innerHTML;
    const originalBgColor = button.style.backgroundColor;
    const originalColor = button.style.color;
    
    // 更新按钮图标为对勾，显示成功状态
    button.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    `;
    
    // 更新按钮样式为绿色
    button.style.backgroundColor = "rgba(34, 197, 94, 0.9)"; // green-500 with opacity
    button.style.color = "#ffffff"; // 白色图标，在绿色背景上更清晰
    
    // 2秒后恢复原状
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.backgroundColor = originalBgColor;
      button.style.color = originalColor;
    }, 2000);
  } catch (error) {
    console.error("复制失败:", error);
    // 降级方案：使用传统方法
    const textArea = document.createElement("textarea");
    textArea.value = codeText;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      // 保存原始样式和内容
      const originalHTML = button.innerHTML;
      const originalBgColor = button.style.backgroundColor;
      const originalColor = button.style.color;
      
      // 更新按钮图标为对勾，显示成功状态
      button.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      `;
      
      // 更新按钮样式为绿色
      button.style.backgroundColor = "rgba(34, 197, 94, 0.9)"; // green-500 with opacity
      button.style.color = "#ffffff"; // 白色图标，在绿色背景上更清晰
      
      // 2秒后恢复原状
      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.backgroundColor = originalBgColor;
        button.style.color = originalColor;
      }, 2000);
    } catch (err) {
      console.error("降级复制也失败:", err);
    }
    document.body.removeChild(textArea);
  }
};

// 处理代码高亮和添加复制按钮
const highlightCode = async () => {
  // 确保 highlight.js 已加载
  const hljsInstance = await loadHighlightJs();
  if (!hljsInstance) {
    console.warn("highlight.js 未加载，跳过代码高亮");
    return;
  }

  nextTick(() => {
    const articleContent = document.querySelector(".prose");
    if (articleContent) {
      // 查找所有代码块
      const preBlocks = articleContent.querySelectorAll("pre");
      preBlocks.forEach((preBlock) => {
        const codeBlock = preBlock.querySelector("code");
        if (!codeBlock) return;

        // 如果还没有被处理过
        if (!preBlock.classList.contains("code-block-processed")) {
          preBlock.classList.add("code-block-processed");

          // 代码高亮
          if (!codeBlock.classList.contains("hljs")) {
            try {
              hljsInstance.highlightElement(codeBlock as HTMLElement);
            } catch (error) {
              console.warn("代码高亮失败:", error);
            }
          }

          // 获取代码文本（去除高亮标签）
          const codeText = codeBlock.textContent || "";

          // 检查是否已有复制按钮
          if (!preBlock.querySelector(".copy-code-button")) {
            // 确保 pre 元素有正确的定位
            const preElement = preBlock as HTMLElement;
            if (getComputedStyle(preElement).position === "static") {
              preElement.style.position = "relative";
            }

            // 创建复制按钮
            const copyButton = document.createElement("button");
            copyButton.className = "copy-code-button";
            copyButton.innerHTML = `
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            `;
            copyButton.setAttribute("title", "复制代码");
            copyButton.setAttribute("aria-label", "复制代码");
            
            // 直接设置样式确保位置正确
            copyButton.style.position = "absolute";
            copyButton.style.top = "8px";
            copyButton.style.right = "8px";
            copyButton.style.height = "32px";
            copyButton.style.width = "32px";
            copyButton.style.minHeight = "32px";
            copyButton.style.minWidth = "32px";
            copyButton.style.backgroundColor = "rgba(55, 65, 81, 0.9)";
            copyButton.style.color = "rgba(209, 213, 219, 0.9)";
            copyButton.style.borderRadius = "6px";
            copyButton.style.cursor = "pointer";
            copyButton.style.transition = "opacity 0.2s, background-color 0.2s, color 0.2s, transform 0.2s";
            copyButton.style.display = "flex";
            copyButton.style.alignItems = "center";
            copyButton.style.justifyContent = "center";
            copyButton.style.padding = "0 !important";
            copyButton.style.lineHeight = "1 !important";
            copyButton.style.fontSize = "0 !important";
            copyButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            copyButton.style.margin = "0 !important";
            copyButton.style.padding = "0 !important";
            copyButton.style.lineHeight = "1 !important";
            copyButton.style.fontSize = "0 !important";

            
            copyButton.addEventListener("click", (e) => {
              e.stopPropagation();
              e.preventDefault();
              copyCode(codeText, copyButton);
            });
            
            // 将按钮添加到 pre 元素内部
            preBlock.appendChild(copyButton);
          }
        }
      });
    }
  });
};

// 加载文章
const loadArticle = async () => {
  try {
    loading.value = true;
    error.value = "";
    const response = (await ApiService.getPost(route.params.id as string)) as ApiResponse<ArticleResponse>;
    article.value = response.data.post || null;
    relatedArticles.value = response.data.related_posts || [];
    
    // 文章加载完成后处理代码高亮和复制按钮，延迟执行确保 DOM 更新完成
    setTimeout(async () => {
      await highlightCode();
    }, 100);
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

// 监听文章内容变化，重新处理代码高亮
watch(
  () => article.value?.content,
  () => {
    // 延迟执行，确保 DOM 完全更新
    setTimeout(async () => {
      await highlightCode();
    }, 100);
  },
  { flush: "post" }
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

/* 行内代码样式 */
.prose code {
  @apply bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono;
  color: #e83e8c;
}

.dark .prose code {
  color: #f472b6;
}

/* 代码块样式 */
.prose pre {
  @apply bg-gray-900 dark:bg-gray-950 rounded-lg p-4 mb-4 text-sm;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative !important;
  overflow-x: auto;
  overflow-y: visible;
  isolation: isolate;
}

.prose pre code {
  @apply bg-transparent p-0 text-gray-100;
  color: inherit;
  font-size: 0.875rem;
  line-height: 1.75;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  display: block;
  overflow-x: auto;
  overflow-y: visible;
}

/* 代码块内的行内代码不应该有背景色 */
.prose pre code {
  background: transparent;
  padding: 0;
}

/* Highlight.js 样式覆盖 */
.prose pre code.hljs {
  @apply bg-transparent;
  padding: 0;
}

.prose pre .hljs {
  @apply bg-transparent;
  padding: 0;
}

/* 确保代码块可以横向滚动，但按钮不被裁剪 */
.prose pre {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: visible;
}

/* 代码块滚动条样式 */
.prose pre::-webkit-scrollbar {
  height: 8px;
}

.prose pre::-webkit-scrollbar-track {
  @apply bg-gray-800 dark:bg-gray-900 rounded;
}

.prose pre::-webkit-scrollbar-thumb {
  @apply bg-gray-600 dark:bg-gray-700 rounded;
}

.prose pre::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500 dark:bg-gray-600;
}

/* 代码块行号容器（如果后端返回了行号） */
.prose pre .line-numbers {
  @apply text-gray-500 dark:text-gray-400 mr-4 select-none;
}

/* 复制按钮样式 - 固定在代码块右上角，悬停显示 */
.prose pre .copy-code-button {
  border-color: rgba(245, 157, 157, 0.2);
}

.prose pre:hover .copy-code-button {
  opacity: 1;
  pointer-events: auto;
}

.prose pre .copy-code-button:hover {
  background-color: rgba(55, 65, 81, 1);
  color: rgba(243, 244, 246, 1);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border-color: rgba(245, 157, 157, 0.2);
}

.prose pre .copy-code-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.prose pre .copy-code-button svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* 代码块语言标签 - 如果 pre 有 data-language 属性则显示 */
.prose pre[data-language]::before {
  content: attr(data-language);
  @apply absolute top-2 right-10 text-xs text-gray-400 dark:text-gray-500 uppercase px-2 py-1 bg-gray-800 dark:bg-gray-900 rounded;
  font-family: sans-serif;
  z-index: 1;
}

/* 如果有语言标签，确保复制按钮在语言标签左侧 */
.prose pre[data-language] .copy-code-button {
  right: 8px;
}
</style>
