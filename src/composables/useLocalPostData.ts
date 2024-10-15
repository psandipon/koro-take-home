import type { Post } from '@/types'
import { toast } from 'vue3-toastify'
import { useStorage } from '@vueuse/core'

const LOCAL_POSTS_STORAGE_KEY = 'local-posts'
const localPost = useStorage<Post[]>(LOCAL_POSTS_STORAGE_KEY, [])

const useLocalPostData = () => {
  const saveLocalPosts = (posts: Post[]) => {
    try {
      localPost.value = posts
    } catch (error) {
      showErrorMessage('Failed to save to localStorage')
    }
  }

  const deleteLocalPosts = () => {
    localPost.value = null
  }

  const getLocalPosts = (): Post[] => {
    try {
      return localPost.value ?? []
    } catch (error) {
      showErrorMessage('Failed to retrieve localStorage data')
      return []
    }
  }

  const showErrorMessage = (message: string) => {
    toast.error(message, {
      autoClose: 3000
    })
  }

  return { localPost, saveLocalPosts, getLocalPosts, deleteLocalPosts }
}

export default useLocalPostData
