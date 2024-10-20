<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup lang="ts" generic="T">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { watchEffect } from 'vue'

const { schema } = defineProps<{
  schema: z.ZodType<T>
}>()

const emit = defineEmits<{
  (e: 'success', values: T): void
  (e: 'error', errors: typeof formErrors.value): void
}>()

// Adding validation to the form
const {
  meta,
  errors: formErrors,
  handleSubmit
} = useForm({
  validationSchema: toTypedSchema(schema)
})

/*
 * Note:
 * As field-level error handling is implemented, I have't used the error event in the parent component.
 * However, I have added it for component's design completeness.
 */
watchEffect(() => {
  emit('error', formErrors.value)
})

const handleFormSubmit = handleSubmit((values) => {
  // handleSubmit will only be called if the form is valid
  emit('success', values as T)
})

const validateForm = () => {
  handleFormSubmit()
  return meta.value.valid
}

/*
 * Note:
 * Exposing the validationForm function to allow triggering validation from the parent component / outside this component
 * So that a separate button can trigger this validation logic.
 */
defineExpose({ validateForm })
</script>
