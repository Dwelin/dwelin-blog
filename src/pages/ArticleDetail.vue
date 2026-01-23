<template>
  <div v-if="article" class="max-w-5xl mx-auto">
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
        <div class="text-center mb-8" v-if="article?.thumbnail_url">
          <img :src="article?.thumbnail_url" alt="文章封面" class="w-full h-64 object-cover rounded-md" />
        </div>
        <div class="article-content-wrapper">
          <div class="w-e-text-container" v-html="article?.content || ''"></div>
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
  <div v-else class="max-w-5xl mx-auto text-center py-12">
    <div class="text-6xl mb-4">📝</div>
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">加载中...</h2>
    <p class="text-gray-600 dark:text-gray-300">正在获取文章内容</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { ApiService } from "../config/api";
// 导入 WangEditor 内容显示样式
import "../styles/wangeditor-content.css";
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
    const articleContent = document.querySelector(".w-e-text-container") || document.querySelector(".article-content") || document.querySelector(".prose");
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
/* 工具类 */
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

/* 文章内容容器 */
.article-content-wrapper {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* 代码高亮和复制按钮样式 - 保留用于代码块功能 */

/* 代码块样式增强 - 用于代码高亮和复制功能 */
.w-e-text-container pre,
.article-content pre {
  position: relative !important;
  isolation: isolate;
  /* 优化代码显示清晰度 */
  font-size: 14px !important;
  line-height: 1.7 !important;
  padding: 16px 20px !important;
  background-color: #1e1e1e !important;
  color: #d4d4d4 !important;
  border: 1px solid #3a3a3a !important;
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Source Code Pro', 'Consolas', 'Courier New', monospace !important;
}

.dark .w-e-text-container pre,
.dark .article-content pre {
  background-color: #1e1e1e !important;
  border-color: #3a3a3a !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

/* 代码块内的代码元素 */
.w-e-text-container pre code,
.article-content pre code {
  background: transparent !important;
  padding: 0 !important;
  color: inherit !important;
  font-size: inherit !important;
  font-weight: normal !important;
  display: block !important;
  white-space: pre !important;
  word-wrap: normal !important;
  word-break: normal !important;
}

/* Highlight.js 样式覆盖 - 确保代码高亮清晰 */
.w-e-text-container pre code.hljs,
.article-content pre code.hljs {
  background: transparent !important;
  padding: 0 !important;
  color: inherit !important;
  display: block !important;
}

.w-e-text-container pre .hljs,
.article-content pre .hljs {
  background: transparent !important;
  padding: 0 !important;
  color: inherit !important;
}

/* 优化高亮后的代码颜色对比度 */
.w-e-text-container pre .hljs-keyword,
.article-content pre .hljs-keyword {
  color: #569cd6 !important;
  font-weight: 500 !important;
}

.w-e-text-container pre .hljs-string,
.article-content pre .hljs-string {
  color: #ce9178 !important;
}

.w-e-text-container pre .hljs-comment,
.article-content pre .hljs-comment {
  color: #6a9955 !important;
  font-style: italic !important;
}

.w-e-text-container pre .hljs-number,
.article-content pre .hljs-number {
  color: #b5cea8 !important;
}

.w-e-text-container pre .hljs-function,
.article-content pre .hljs-function {
  color: #dcdcaa !important;
}

.w-e-text-container pre .hljs-variable,
.article-content pre .hljs-variable {
  color: #9cdcfe !important;
}

.w-e-text-container pre .hljs-title,
.article-content pre .hljs-title {
  color: #4ec9b0 !important;
}

/* 代码块滚动条样式 - 优化显示 */
.w-e-text-container pre::-webkit-scrollbar,
.article-content pre::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

.w-e-text-container pre::-webkit-scrollbar-track,
.article-content pre::-webkit-scrollbar-track {
  background: #2a2a2a;
  border-radius: 5px;
  margin: 4px;
}

.dark .w-e-text-container pre::-webkit-scrollbar-track,
.dark .article-content pre::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.w-e-text-container pre::-webkit-scrollbar-thumb,
.article-content pre::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 5px;
  border: 2px solid #2a2a2a;
}

.dark .w-e-text-container pre::-webkit-scrollbar-thumb,
.dark .article-content pre::-webkit-scrollbar-thumb {
  background: #5a5a5a;
  border-color: #1a1a1a;
}

.w-e-text-container pre::-webkit-scrollbar-thumb:hover,
.article-content pre::-webkit-scrollbar-thumb:hover {
  background: #6a6a6a;
}

.dark .w-e-text-container pre::-webkit-scrollbar-thumb:hover,
.dark .article-content pre::-webkit-scrollbar-thumb:hover {
  background: #7a7a7a;
}

/* 代码块行号容器 */
.w-e-text-container pre .line-numbers,
.article-content pre .line-numbers {
  color: #999;
  margin-right: 1rem;
  user-select: none;
}

/* 复制按钮样式 - 固定在代码块右上角 */
.w-e-text-container pre .copy-code-button,
.article-content pre .copy-code-button {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  background-color: rgba(55, 65, 81, 0.9);
  color: rgba(209, 213, 219, 0.9);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  line-height: 1;
  font-size: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s, background-color 0.2s, color 0.2s, transform 0.2s;
  opacity: 0.7;
  border: none;
  z-index: 10;
}

.w-e-text-container pre:hover .copy-code-button,
.article-content pre:hover .copy-code-button {
  opacity: 1;
  pointer-events: auto;
}

.w-e-text-container pre .copy-code-button:hover,
.article-content pre .copy-code-button:hover {
  background-color: rgba(55, 65, 81, 1);
  color: rgba(243, 244, 246, 1);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.w-e-text-container pre .copy-code-button:active,
.article-content pre .copy-code-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.w-e-text-container pre .copy-code-button svg,
.article-content pre .copy-code-button svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* 代码块语言标签 */
.w-e-text-container pre[data-language]::before,
.article-content pre[data-language]::before {
  content: attr(data-language);
  position: absolute;
  top: 8px;
  right: 48px;
  font-size: 0.75rem;
  color: #999;
  text-transform: uppercase;
  padding: 4px 8px;
  background-color: #2a2a2a;
  border-radius: 4px;
  font-family: sans-serif;
  z-index: 1;
}

.dark .w-e-text-container pre[data-language]::before,
.dark .article-content pre[data-language]::before {
  background-color: #1e1e1e;
  color: #999;
}

.w-e-text-container pre[data-language] .copy-code-button,
.article-content pre[data-language] .copy-code-button {
  right: 8px;
}

/* 表格响应式处理 - 移动端横向滚动 */
@media (max-width: 768px) {
  .w-e-text-container table,
  .article-content table {
    min-width: 600px;
    font-size: 13px;
  }
  
  .w-e-text-container table th,
  .w-e-text-container table td,
  .article-content table th,
  .article-content table td {
    padding: 6px 8px;
  }
}
</style>
