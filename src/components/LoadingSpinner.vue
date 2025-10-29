<template>
  <div class="flex items-center justify-center">
    <div class="relative">
      <div class="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
      <div class="absolute top-0 left-0 w-8 h-8 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <span v-if="text" class="ml-3 text-gray-600 dark:text-gray-300">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string;
}

defineProps<Props>();
</script> 