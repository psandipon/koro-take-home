<template>
  <button
    :class="['base-button', `${size}`, `${variant}`, { loading: loading }]"
    :disabled="loading || disabled"
    @click="handleClick"
    data-test="base-button"
  >
    <span>
      <img
        v-if="loading"
        :src="isDark ? loaderDark : loader"
        alt="loading..."
        class="loader"
        data-test="base-button-loader"
      />
      <img v-else-if="icon" :src="icon" alt="icon" class="icon" data-test="base-button-icon" />
      <slot v-else>
        {{ text }}
      </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { loader, loaderDark } from '@/assets'
import { ButtonVariant, ButtonSize } from '@/types'
import { useDarkMode } from '@/composables'
import type { ButtonVariantType, ButtonSizeType } from '@/types'

interface BaseButtonProps {
  text?: string
  icon?: string
  loading?: boolean
  disabled?: boolean
  size?: ButtonSizeType
  variant?: ButtonVariantType
}
const {
  icon,
  text = '',
  loading,
  disabled,
  size = ButtonSize.Md,
  variant = ButtonVariant.Primary
} = defineProps<BaseButtonProps>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const { isDark } = useDarkMode()

const handleClick = (event: MouseEvent) => {
  if (!loading && !disabled) {
    emit('click', event)
  }
}
</script>

<style lang="postcss" scoped>
.base-button {
  @apply border-none rounded-none cursor-pointer text-primary-color;
}

.base-button.loading {
  @apply cursor-not-allowed;
}

.loader {
  @apply w-5 h-5 text-gray-200 fill-primary-color animate-spin;
}

.icon {
  @apply w-5 h-5 text-gray-200;
}

.btn-primary {
  @apply bg-primary-color text-contrast-color;
}

.btn-secondary {
  @apply bg-secondary-color;
}

.btn-danger {
  @apply bg-error-color text-contrast-color;
}

.btn-small {
  @apply px-2 py-1 text-xs h-8;
}

.btn-medium {
  @apply px-4 py-2 text-base h-10;
}

.btn-large {
  @apply px-6 py-3 text-lg h-12;
}

.base-button:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
