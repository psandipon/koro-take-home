<template>
  <div class="table-pagination">
    <BaseButton
      @click="prevPage"
      :disabled="currentPage === 1"
      :variant="ButtonVariant.Secondary"
      :size="getPaginationButtonSize"
      aria-label="Go to previous page"
    >
      Previous
    </BaseButton>

    <!-- Note: As v-for takes precedence over v-if, I am wrapping the v-for with v-if -->
    <div v-if="smOrGreater">
      <BaseButton
        class="mx-1"
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :disabled="currentPage === page"
        :variant="ButtonVariant.Secondary"
        :size="getPaginationButtonSize"
        :aria-current="currentPage === page ? 'page' : undefined"
        :aria-label="`Go to page ${page}`"
      >
        {{ page }}
      </BaseButton>
    </div>
    <div v-else class="pagination-info">{{ currentPage }} / {{ totalPages }}</div>

    <BaseButton
      @click="nextPage"
      :disabled="currentPage === totalPages"
      :variant="ButtonVariant.Secondary"
      :size="getPaginationButtonSize"
      aria-label="Go to next page"
    >
      Next
    </BaseButton>

    <!-- Below is a simple per page selector, it can be improved-->
    <div
      class="flex justify-end border-2 border-secondary-color rounded-none px-2 py-2"
      v-if="smOrGreater"
    >
      <!-- for design purpose; not adding a label -->
      <select id="perPage" v-model="itemsPerPage" class="ring-transparent">
        <option
          v-for="(option, index) in [10, 15, 20, 25, 50]"
          :key="`${option}-${index}`"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ButtonVariant, ButtonSize } from '@/types'
import { useScreenSize } from '@/composables'
const { smOrGreater } = useScreenSize()

const { totalItems } = defineProps<{
  totalItems: number
}>()

const itemsPerPage = defineModel<number>('itemsPerPage', { required: true })
const currentPage = defineModel<number>('currentPage', { required: true })

const totalPages = computed(() => Math.ceil(totalItems / itemsPerPage.value))

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const getPaginationButtonSize = computed(() => {
  return smOrGreater ? ButtonSize.Md : ButtonSize.Sm
})
</script>

<style lang="postcss" scoped>
.table-pagination {
  @apply flex flex-wrap justify-center items-center mt-4 gap-3;
}

.pagination-info {
  @apply px-4 py-2 text-sm border rounded-none;
}
</style>
