<template>
  <div class="base-select">
    <label :for="name">{{ labelText }}</label>
    <Multiselect
      v-model="modelValue"
      :options="options"
      searchable
      :canClear="false"
      class="multiselect"
    />
    <p>{{ errorMessage ?? '' }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useField } from 'vee-validate'
import Multiselect from '@vueform/multiselect'

type Option = {
  label: string
  value: number
}

const {
  name,
  options,
  labelText = ''
} = defineProps<{
  name: string
  labelText?: string
  options: Option[]
}>()

const modelValue = defineModel<number>()

// validation logic
const {
  meta,
  errorMessage,
  value: useFieldValue
} = useField(name, undefined, {
  initialValue: modelValue
})

// On model-value change, we need to update the validation value
watch(modelValue, (val) => (useFieldValue.value = val))

const getBorder = computed(() => {
  if (errorMessage.value) return 'var(--error-color)'
  if (meta.valid) return 'var(--success-color)'
  return 'var(--secondary-color)'
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="postcss" scoped>
/* 
 *  Below css overriding is needed to match with the rest of the application design
 *  More details can be found at https://www.npmjs.com/package/@vueform/multiselect 
 */
.multiselect {
  --ms-bg: var(--contrast-color);
  --ms-border-color: v-bind(getBorder);
  --ms-border-width: 2px;
  --ms-border-color-active: var(--secondary-color);
  --ms-border-width-active: 2px;
  --ms-ring-width: 0px;
  --ms-radius: 0px;
  --ms-option-font-size: 1rem;
  --ms-option-line-height: 1.375;
  --ms-option-bg-pointed: var(--primary-color);
  --ms-option-color-pointed: var(--contrast-color);
  --ms-option-bg-selected: var(--primary-color);
  --ms-option-color-selected: var(--contrast-color);
  --ms-option-bg-selected-pointed: var(--primary-color);
  --ms-option-color-selected-pointed: var(--contrast-color);
  --ms-dropdown-bg: var(--contrast-color);
  --ms-dropdown-border-color: var(--secondary-color);
  --ms-dropdown-border-width: 2px;
  --ms-dropdown-radius: 0px;
}

.base-select {
  @apply flex flex-col gap-1 w-full;
}

/* main ui elements */
label {
  @apply text-lg font-medium;
}
p {
  @apply h-5 text-xs text-error-color;
}
</style>
