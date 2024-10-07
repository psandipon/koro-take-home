import { describe, it, expect, vi, beforeEach } from 'vitest'
import { saveLocalPosts, getLocalPosts, deleteLocalPosts } from '@/utils/manageLocalPostData'

vi.mock('vue3-toastify', () => ({
  toast: {
    error: vi.fn()
  }
}))

describe('manageLocalPostData', () => {
  const mockPosts = [{ id: 1, title: 'Test Post', body: 'Test Body', userId: 1 }]

  beforeEach(() => {
    localStorage.clear()
  })

  it('saves posts to localStorage', () => {
    saveLocalPosts(mockPosts)
    const storedData = localStorage.getItem('local-posts')
    expect(storedData).toBe(JSON.stringify(mockPosts))
  })

  it('retrieves posts from localStorage', () => {
    localStorage.setItem('local-posts', JSON.stringify(mockPosts))
    const retrievedPosts = getLocalPosts()
    expect(retrievedPosts).toEqual(mockPosts)
  })

  it('returns an empty array when no posts are found', () => {
    const retrievedPosts = getLocalPosts()
    expect(retrievedPosts).toEqual([])
  })

  it('deletes posts from localStorage', () => {
    localStorage.setItem('local-posts', JSON.stringify(mockPosts))
    deleteLocalPosts()
    const storedData = localStorage.getItem('local-posts')
    expect(storedData).toBeNull()
  })
})
