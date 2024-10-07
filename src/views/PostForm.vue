<template>
  <BaseModal @close="closeModal" v-if="isModalOpen" aria-label="Post Form Modal">
    <template #header>
      <BaseHeader :title="isEditMode ? `Edit Post` : `Add New Post`"> </BaseHeader>
    </template>
    <template #default>
      <BaseForm
        :schema="postSchema"
        ref="baseFormRef"
        @success="onSuccess"
        aria-labelledby="formInstructions"
      >
        <BaseSelect
          name="userId"
          labelText="User"
          :options="getUsers"
          v-model="newPost.userId"
          aria-required="true"
        />
        <BaseInput name="title" labelText="Title" v-model="newPost.title" aria-required="true" />
        <BaseInput
          :rows="8"
          name="body"
          labelText="Body"
          aria-required="true"
          :inputKind="BaseInputKind.Textarea"
          v-model="newPost.body"
        />
      </BaseForm>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <BaseButton @click="closeModal" :variant="ButtonVariant.Secondary" aria-label="Close Form">
          Close
        </BaseButton>
        <BaseButton @click="onSubmit" :loading="dataSubmissionLoading" aria-label="Submit Form">
          Submit
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import { storeToRefs } from 'pinia'
import { ButtonVariant, BaseInputKind } from '@/types'
import type { Post, FormPost } from '@/types'
import { ref, useTemplateRef, watch } from 'vue'
import { usePostStore, useUserStore } from '@/stores'
import { BaseForm } from '@/components/BaseComponents'
import type { ComponentExposed } from 'vue-component-type-helpers'

const { postToEdit, isEditMode } = defineProps<{
  postToEdit: Post | null
  isEditMode: boolean
}>()
const isModalOpen = defineModel<boolean>({ required: true })
const emit = defineEmits<{
  (e: 'close'): void
}>()

// handling store
const postStore = usePostStore()
const { updatePost, addPost, getEmptyPost } = postStore
const userStore = useUserStore()
const { getUsers } = storeToRefs(userStore)

// States
const newPost = ref<FormPost>(getEmptyPost())
const dataSubmissionLoading = ref(false)
const baseFormInstance = useTemplateRef<ComponentExposed<typeof BaseForm>>('baseFormRef')

// Note: using vee validation and defining the schema here
// Validation logic
const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  userId: z.number().min(1, 'User is required')
})

// Note: Error handling has been implemented at axios singleton level at file useAxios.ts
// Handling success form submission
const onSuccess = async (values: FormPost) => {
  dataSubmissionLoading.value = true
  if (isEditMode && postToEdit) {
    await updatePost(postToEdit.id, values)
  } else {
    await addPost(values)
  }
  dataSubmissionLoading.value = false
  closeModal()
}

const onSubmit = async () => {
  // triggering base-form validation using template ref
  baseFormInstance?.value?.validateForm()
}

watch(
  () => postToEdit,
  (newVal) => {
    if (newVal) newPost.value = { ...newVal }
  }
)

const closeModal = () => {
  emit('close')
  newPost.value = getEmptyPost()
}
</script>
