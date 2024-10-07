<template>
  <div class="base-header">
    <h1 class="base-header-title">{{ title }}</h1>
    <div class="base-header-actions">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const { title } = defineProps<{ title: string }>();
</script>

<style lang="postcss" scoped>
.base-header {
  @apply flex justify-between items-center justify-items-center;
}
.base-header-title {
  @apply text-2xl font-bold;
}
.base-header-actions {
  @apply flex place-content-center;
}
</style>
