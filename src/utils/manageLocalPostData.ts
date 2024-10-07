import type { Post } from '@/types'
import { toast } from 'vue3-toastify'
const LOCAL_STORAGE_KEY = 'local-posts'

const saveLocalPosts = (posts: Post[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts))
  } catch (error) {
    showErrorMessage('Failed to save to localStorage')
  }
}

const deleteLocalPosts = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}

const getLocalPosts = (): Post[] => {
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY)
    return localData ? (JSON.parse(localData) as Post[]) : []
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

export { saveLocalPosts, getLocalPosts, deleteLocalPosts }
