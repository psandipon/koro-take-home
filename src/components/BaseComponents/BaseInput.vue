<template>
  <div class="base-input" :class="{ 'has-error': !!errorMessage, 'is-success': meta.valid }">
    <label :for="name">{{ labelText }}</label>
    <component :is="inputComponent" />
    <p>{{ errorMessage ?? '' }}</p>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, useAttrs, h } from 'vue'
import { BaseInputKind } from '@/types'

const {
  name,
  labelText = '',
  modelValue,
  inputKind = BaseInputKind.Input
} = defineProps<{
  name: string
  labelText?: string
  modelValue: string
  inputKind?: keyof typeof BaseInputKind
}>()

const emit = defineEmits(['update:modelValue'])

/**
 * Note:
 * That here I have intentionally handled v-model manually to show the concept.
 * I have used the emit and update:modelValue and modelValue props.
 */

// validation logic
const {
  meta,
  errorMessage,
  value: validationValue
} = useField(name, undefined, {
  initialValue: modelValue
})

const attrs = useAttrs()

const textInput = () => {
  return h('input', {
    ...attrs,
    name,
    type: 'text',
    value: modelValue,
    onInput: (event) => {
      const userValue = (event.target as HTMLInputElement).value
      validationValue.value = userValue
      emit('update:modelValue', userValue)
    },
    onKeydown: (event) => {
      if (event.key === 'Enter') event.preventDefault()
    }
  })
}

const textArea = () => {
  return h('textarea', {
    ...attrs,
    name,
    value: modelValue,
    onInput: (event) => {
      const userValue = (event.target as HTMLInputElement).value
      validationValue.value = userValue
      emit('update:modelValue', userValue)
    }
  })
}

const inputComponent = computed(() => (inputKind === BaseInputKind.Input ? textInput : textArea))
</script>

<style lang="postcss" scoped>
.base-input {
  @apply flex flex-col gap-1 w-full;
}

/* main ui elements */
label {
  @apply text-lg font-medium;
}
input,
textarea {
  @apply border-2 border-secondary-color w-full outline-none rounded-none p-2;
}
p {
  @apply h-5 text-xs text-error-color;
}

/* Success styles  */
.is-success input,
.is-success textarea {
  @apply border-success-color;
}
/* Error styles */
.has-error input,
.has-error textarea {
  @apply border-error-color;
}
</style>
