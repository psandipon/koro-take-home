<template>
  <div class="base-modal" role="dialog" aria-labelledby="modalTitle" aria-modal="true" tabindex="0">
    <div class="base-modal-container" ref="modalRef">
      <header v-if="slots.header" id="modalTitle">
        <slot name="header"></slot>
      </header>
      <main v-if="slots.default" aria-describedby="modalBody">
        <slot></slot>
      </main>
      <footer v-if="slots.footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, useTemplateRef } from 'vue'
import { onClickOutside, useMagicKeys, whenever } from '@vueuse/core'

const emit = defineEmits<{
  close: []
}>()
const close = () => emit('close')
const slots = useSlots()

// Modal can be closed by clicking outside of it
const modalRef = useTemplateRef('modalRef')
onClickOutside(modalRef, close)

// Modal can be closed by pressing the escape key
whenever(useMagicKeys().escape, close)
</script>

<style lang="postcss" scoped>
.base-modal {
  @apply fixed inset-0 flex items-center justify-center z-50 bg-shadow-color bg-opacity-70;
}

.base-modal-container {
  @apply bg-contrast-color p-6 rounded-none shadow-md w-full max-w-md flex flex-col gap-4;
}
</style>
