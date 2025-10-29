<template>
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Hero Section -->
    <section class="text-center py-12">
      <div class="mb-8">
        <img
          :src="faviconUrl"
          alt="Dwelin"
          class="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg border-4 border-white dark:border-gray-800"
        />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
        你好，我是 <span class="text-blue-600 dark:text-blue-400">Dwelin</span>
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">一名热爱技术与生活的全栈开发者</p>
      <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
        愿你有前进一寸的勇气，亦有后退一尺的从容。在这里，我分享技术心得、生活感悟，希望能与你一起成长。
      </p>
    </section>

    <!-- Skills Section -->
    <section class="py-8">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">技术栈</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <div class="text-4xl mb-3">{{ skill.icon }}</div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ skill.name }}</h3>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="bg-blue-600 h-2 rounded-full transition-all duration-1000" :style="{ width: skill.level + '%' }"></div>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ skill.level }}%</p>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="py-8">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">工作经历</h2>
      <div class="space-y-6">
        <div
          v-for="experience in experiences"
          :key="experience.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ experience.title }}</h3>
              <p class="text-blue-600 dark:text-blue-400 font-medium">{{ experience.company }}</p>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
              {{ experience.period }}
            </span>
          </div>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ experience.description }}</p>
          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="tech in experience.technologies"
              :key="tech"
              class="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">联系我</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div class="text-2xl">📧</div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">邮箱</h3>
            <p class="text-gray-600 dark:text-gray-300">dwelin@foxmail.com</p>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div class="text-2xl">🐙</div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">GitHub</h3>
            <a href="https://github.com/dwelin" class="text-blue-600 dark:text-blue-400 hover:underline">github.com/dwelin</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Stats -->
    <section class="py-8">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">博客统计</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{{ stats.articles }}</div>
          <div class="text-gray-600 dark:text-gray-300">发布文章</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{{ stats.views }}</div>
          <div class="text-gray-600 dark:text-gray-300">总浏览量</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{{ stats.comments }}</div>
          <div class="text-gray-600 dark:text-gray-300">评论数</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">{{ stats.days }}</div>
          <div class="text-gray-600 dark:text-gray-300">博客天数</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import faviconUrl from "../assets/favicon.ico";

interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

const skills = ref<Skill[]>([
  { name: "Vue.js", icon: "⚡", level: 70 },
  { name: "TypeScript", icon: "🔧", level: 85 },
  { name: "MySQL", icon: "🗄️", level: 75 },
  { name: "Docker", icon: "🐳", level: 65 }
  // { name: "React", icon: "⚛️", level: 80 },
  // { name: "Node.js", icon: "🟢", level: 75 },
  // { name: "Python", icon: "🐍", level: 70 },
  // { name: "AWS", icon: "☁️", level: 60 }
]);

const experiences = ref<Experience[]>([
  {
    id: 1,
    title: "全栈开发工程师",
    company: "某科技公司",
    period: "2020 - 2022",
    description: "参与产品从0到1的完整开发流程，负责前端架构设计和后端API开发。",
    technologies: ["Vue.js", "Laravel", "MySQL", "Docker"]
  }
]);

const stats = ref({
  articles: 0,
  views: 0,
  comments: 0,
  days: 0
});
</script>
