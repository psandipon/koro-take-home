<template>
  <div>
    <BaseHeader title="Posts">
      <BaseButton
        @click="openModal(ModalMode.Add)"
        :size="smOrGreater ? ButtonSize.Md : ButtonSize.Sm"
        aria-label="Add a new post"
      >
        Add New Post
      </BaseButton>
    </BaseHeader>

    <BaseTable
      v-if="postsData.length"
      :items="postsData"
      :headers="headers"
      @edit="editPostItem"
      @delete="deletePostItem"
      aria-label="List of posts"
      role="table"
    />

    <PostForm
      v-model="isModalOpen"
      :is-edit-mode="isEditMode"
      :post-to-edit="postToEdit"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '@/types'
import { storeToRefs } from 'pinia'
import { ButtonSize } from '@/types'
import PostForm from './PostForm.vue'
import { useScreenSize } from '@/composables'
import { ref, onMounted, computed } from 'vue'
import { usePostStore, useUserStore } from '@/stores'

const { smOrGreater } = useScreenSize()

const postStore = usePostStore()
const { getPosts } = storeToRefs(postStore)
const { fetchPosts, deletePost } = postStore
const userStore = useUserStore()
const { getUsers, usersMap } = storeToRefs(userStore)
const { fetchUsers } = userStore

const headers = [
  { text: 'Title', value: 'title' },
  { text: 'Body', value: 'body' },
  { text: 'User', value: 'user' },
  { text: 'Edit', value: 'edit' },
  { text: 'Delete', value: 'delete' }
]

enum ModalMode {
  Add = 'add',
  Edit = 'edit'
}

const isModalOpen = ref(false)
const isEditMode = ref(false)
const postToEdit = ref<Post | null>(null)

const editPostItem = (post: Post) => openModal(ModalMode.Edit, post)
const deletePostItem = (post: Post) => deletePost(post.id)
const openModal = (mode: ModalMode, post: Post | null = null) => {
  isEditMode.value = mode === ModalMode.Edit
  postToEdit.value = post
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  postToEdit.value = null
}

// Fetch posts on component mount
onMounted(async () => {
  if (!getPosts.value.length) await fetchPosts()
  if (!getUsers.value.length) await fetchUsers()
})

const postsData = computed(() =>
  getUsers.value.length
    ? getPosts.value.map((post: Post) => {
        return { ...post, user: usersMap.value[post.userId]?.name }
      })
    : []
)
</script>
