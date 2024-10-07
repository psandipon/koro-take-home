<template>
  <footer>
    <div class="footer-container">
      <p class="footer-container-text">© KoRo 2024.</p>
      <div class="footer-container-action">
        <component :is="darkModeToggle" title="toggle dark mode" />
        <BaseButton
          @click="resetTableData"
          :variant="ButtonVariant.Secondary"
          :size="ButtonSize.Sm"
          :icon="isDark ? reset : resetDark"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ButtonSize, ButtonVariant } from '@/types'
import { useDarkMode } from '@/composables'
import { reset, resetDark } from '@/assets'
import { deleteLocalPosts } from '@/utils'

const { darkModeToggle, isDark } = useDarkMode()

const resetTableData = () => {
  window.location.reload()
  deleteLocalPosts()
}
</script>

<style lang="postcss" scoped>
footer {
  @apply bg-contrast-color p-4 fixed bottom-0 w-full text-center border-t-2 border-secondary-color;
}

.footer-container {
  @apply container mx-auto flex justify-between;
}

.footer-container-text {
  @apply text-lg;
}

.footer-container-action {
  @apply flex justify-center gap-3;
}
</style>
