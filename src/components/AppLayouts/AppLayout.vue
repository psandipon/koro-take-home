<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/AppLayouts/AppHeader.vue'
import Footer from '@/components/AppLayouts/AppFooter.vue'
</script>

<style lang="postcss" scoped>
main {
  @apply container mx-auto px-5 my-20;
}
</style>
