import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostStore } from '@/stores/postStore'

describe('postStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches and sets posts', async () => {
    const store = usePostStore()
    expect(store.posts.length).toBe(0)
    await store.fetchPosts()
    expect(store.posts.length).toBe(100)
  })

  it('adds a new post', async () => {
    const store = usePostStore()
    const mockPost = { title: 'New Post', body: 'New Body', userId: 1 }
    await store.addPost(mockPost)
    expect(store.posts.length).toBe(1)
    expect(store.posts[0].title).toBe(mockPost.title)
  })

  it('updates a post', async () => {
    const store = usePostStore()
    await store.fetchPosts()
    const updatedMockPost = { title: 'Updated Post', body: 'Updated Body', userId: 1 }
    await store.updatePost(1, updatedMockPost)
    expect(store.posts[0].title).toBe(updatedMockPost.title)
  })

  it('deletes a post', async () => {
    const store = usePostStore()
    await store.fetchPosts() // updatedMockPost will be fetched
    await store.deletePost(1) // updatedMockPost will be deleted
    expect(store.posts.length).toBe(0)
  })
})
