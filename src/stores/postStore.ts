import type { Post, FormPost } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useAxios, useLocalPostData } from '@/composables'
import { toast } from 'vue3-toastify'

const { get, post, put, del } = useAxios()
const { saveLocalPosts, getLocalPosts } = useLocalPostData()

export const usePostStore = defineStore('postStore', () => {
  const posts = ref<Post[]>([])

  // Getter
  const getPosts = computed(() => {
    return [...posts.value].reverse()
  })

  const getEmptyPost = (): FormPost => {
    return {
      title: '',
      body: '',
      userId: 0
    }
  }

  // GET
  const fetchPosts = async () => {
    if (loadLocalPosts()) {
      toast.success('Post successfully fetched locally')
      return
    }
    const response = await get<Post[]>('/posts')
    posts.value = response?.data ?? []
    toast.success('Post fetched successfully')
  }

  // DELETE
  const deletePost = async (id: number) => {
    await del<Post>(`/posts/${id}`)
    posts.value = posts.value.filter((post) => post.id !== id)
    toast.success('Post deleted successfully')
  }

  // POST
  const addPost = async (newPost: FormPost) => {
    const response = await post<Post>('/posts', newPost)
    if (response && response.data) {
      posts.value.push(ensureUniqueId(response.data))
      toast.success('Post added successfully')
    }
  }

  // PUT
  const updatePost = async (id: number, newPost: FormPost) => {
    const response = await put<Post>(`/posts/${id}`, newPost)

    if (response && response.data) {
      const index = posts.value.findIndex((p) => p.id === response.data.id)
      posts.value[index] = response.data
      toast.success('Post updated successfully')
    }
  }

  /*
   * Note:
   * In a real world application, below code should not be needed.
   * Here, adding it because json-placeholder does not save data in the backend and does not persist data.
   */

  const loadLocalPosts = () => {
    const localData = getLocalPosts()
    if (localData && localData.length) {
      posts.value = localData
      return true
    }
    return false
  }

  const ensureUniqueId = (post: Post) => {
    const uniqueIdPost = { ...post }
    const maxId = posts.value.length > 0 ? Math.max(...posts.value.map((post) => post.id)) : 0
    uniqueIdPost.id = maxId + 1
    return uniqueIdPost
  }

  watch(posts, (val) => saveLocalPosts(val), { deep: true })

  return {
    posts,
    getPosts,
    addPost,
    fetchPosts,
    updatePost,
    deletePost,
    getEmptyPost
  }
})
