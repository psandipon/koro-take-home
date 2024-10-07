<template>
  <div>
    <div v-if="items.length > 0">
      <!-- normal table -->
      <table v-if="smOrGreater">
        <thead>
          <tr>
            <th>#</th>
            <th v-for="header in headers" :key="`${header.text}-${header.value}`">
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in getPaginatedItems" :key="`${item.id}-${index}`">
            <td>
              {{ getCurrentItemCount(index) }}
            </td>
            <td v-for="option in filteredHeaders" :key="option.text">
              {{ item[option.value] ?? '' }}
            </td>
            <td v-if="ifEdit">
              <EditButton @click="editItem(item)" />
            </td>
            <td v-if="ifDelete">
              <DeleteButton @click="deleteItem(item)" />
            </td>
          </tr>
        </tbody>
      </table>
      <!-- responsive/small table -->
      <table v-else>
        <tbody>
          <tr v-for="(item, index) in getPaginatedItems" :key="`${item.id}-${index}`">
            <td class="p-5">
              <b>{{ getCurrentItemCount(index) }}</b>
              <div v-for="option in filteredHeaders" :key="option.text">
                <b>{{ option.text }}</b> :
                {{ item[option.value] ?? '' }}
              </div>
              <div class="flex justify-end mt-2 gap-3">
                <EditButton v-if="ifEdit" @click="editItem(item)" />
                <DeleteButton v-if="ifDelete" @click="deleteItem(item)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <BasePagination
        :total-items="items.length"
        v-model:itemsPerPage="itemsPerPage"
        v-model:currentPage="currentPage"
      />
    </div>
    <!-- For else case, we can add a "NO DATA" component -->
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { computed, ref } from 'vue'
import { ButtonSize, ButtonVariant, BaseTableEvent } from '@/types'
import { BaseButton } from '@/components/BaseComponents'
import { useScreenSize } from '@/composables'

interface Items {
  id: number
  [key: string]: string | number
}

interface Headers {
  text: string
  value: string
}

const { items, headers } = defineProps<{
  items: Items[]
  headers: Headers[]
}>()

const emit = defineEmits<{
  (e: BaseTableEvent.Delete, item: Items): void
  (e: BaseTableEvent.Edit, item: Items): void
}>()

const { smOrGreater } = useScreenSize()

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(15)

const getPaginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return items.slice(start, end)
})

// This is to ensure that the edit and delete buttons are shown directly in the table
const filteredHeaders = computed(() =>
  headers.filter(
    (header) => header.value !== BaseTableEvent.Edit && header.value !== BaseTableEvent.Delete
  )
)

const getCurrentItemCount = (index: number) => {
  return (currentPage.value - 1) * itemsPerPage.value + (index + 1)
}

// This is to ensure that the edit and delete buttons are only shown if the headers contain the edit and delete keys
const ifEdit = computed(() => headers.some((header) => header.value === BaseTableEvent.Edit))
const ifDelete = computed(() => headers.some((header) => header.value === BaseTableEvent.Delete))

// Emitting events
const deleteItem = (item: Items) => emit(BaseTableEvent.Delete, item)
const editItem = (item: Items) => emit(BaseTableEvent.Edit, item)

// Reusable buttons, `@click` have been passed via fallthrough attributes
const EditButton = () => h(BaseButton, { size: ButtonSize.Sm, text: 'Edit' })
const DeleteButton = () =>
  h(BaseButton, {
    size: ButtonSize.Sm,
    variant: ButtonVariant.Danger,
    text: 'Delete'
  })
</script>

<style lang="postcss" scoped>
table {
  @apply text-left table-auto w-full mt-5 border;
}

tr {
  @apply border-b;
}

th,
td {
  @apply px-4 py-2;
}
</style>
