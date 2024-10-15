import { describe, test, expect } from 'vitest'
import useLocalPostData from '@/composables/useLocalPostData'

describe('useLocalPostData', () => {
  const { localPost, saveLocalPosts, getLocalPosts, deleteLocalPosts } = useLocalPostData()

  const mockPosts = [
    { id: 1, title: 'Post 1', body: 'This is post 1', userId: 1 },
    { id: 2, title: 'Post 2', body: 'This is post 2', userId: 2 }
  ]

  test('should save posts to localStorage', () => {
    saveLocalPosts(mockPosts)
    expect(localPost.value).toEqual(mockPosts)
  })

  test('should get the saved posts from localStorage', () => {
    expect(getLocalPosts()).toEqual(mockPosts)
  })

  test('should delete posts from localStorage', () => {
    deleteLocalPosts()
    expect(getLocalPosts()).toEqual([])
    expect(localPost.value).toBeNull()
  })
})
