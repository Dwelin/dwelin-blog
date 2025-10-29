<template>
  <header
    class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
  >
    <nav class="flex items-center justify-between max-w-6xl mx-auto px-4 py-4">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <img :src="faviconUrl" alt="Dwelin" class="w-8 h-8 rounded-lg shadow-sm" />
        <span class="font-bold text-xl text-gray-800 dark:text-white">Dwelin</span>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-1">
        <router-link to="/" class="nav-link" :class="{ 'nav-link-active': $route.path === '/' }"> 首页 </router-link>
        <router-link to="/articles" class="nav-link" :class="{ 'nav-link-active': $route.path === '/articles' }">
          全部文章
        </router-link>
        <router-link to="/about" class="nav-link" :class="{ 'nav-link-active': $route.path === '/about' }"> 关于me </router-link>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-3">
        <ThemeToggle />

        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile Menu Overlay -->
  <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 md:hidden" @click="closeMobileMenu">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Menu Panel -->
    <div
      class="absolute right-0 top-0 h-full w-60 max-w-[50vw] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out"
      :class="mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
      @click.stop
    >
      <!-- Menu Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Menu</h2>
        <button
          @click="closeMobileMenu"
          class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Menu Items -->
      <div class="p-6 space-y-4">
        <router-link
          to="/"
          class="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :class="{ 'bg-green-500 text-white hover:bg-green-600': $route.path === '/' }"
          @click="closeMobileMenu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          首页
        </router-link>

        <router-link
          to="/articles"
          class="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :class="{ 'bg-green-500 text-white hover:bg-green-600': $route.path === '/articles' }"
          @click="closeMobileMenu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            ></path>
          </svg>
          全部文章
        </router-link>

        <router-link
          to="/about"
          class="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :class="{ 'bg-green-500 text-white hover:bg-green-600': $route.path === '/about' }"
          @click="closeMobileMenu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          关于me
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ThemeToggle from "./ThemeToggle.vue";
import faviconUrl from "../assets/favicon.ico";

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};
</script>

<style scoped>
.nav-link {
  @apply px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 font-medium;
}

.nav-link-active {
  @apply bg-green-500 text-white hover:bg-green-600;
}
</style>
