import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostStore } from '@/stores/postStore'
import { nextTick } from 'vue'

vi.mock('@/composables', () => ({
  useAxios: () => ({
    get: vi.fn(() =>
      Promise.resolve({ data: [{ id: 1, title: 'Test Post', body: 'Test Body', userId: 1 }] })
    ),
    post: vi.fn(() =>
      Promise.resolve({ data: { id: 2, title: 'New Post', body: 'New Body', userId: 1 } })
    ),
    put: vi.fn(() =>
      Promise.resolve({ data: { id: 1, title: 'Updated Post', body: 'Updated Body', userId: 1 } })
    ),
    del: vi.fn(() => Promise.resolve())
  })
}))

vi.mock('@/utils', () => ({
  saveLocalPosts: vi.fn(),
  getLocalPosts: vi.fn(() => [])
}))

describe('postStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches and sets posts', async () => {
    const store = usePostStore()

    expect(store.posts.length).toBe(0)

    await store.fetchPosts()
    await nextTick()

    expect(store.posts.length).toBe(1)
    expect(store.posts[0].title).toBe('Test Post')
  })

  it('adds a new post', async () => {
    const store = usePostStore()

    await store.addPost({ title: 'New Post', body: 'New Body', userId: 1 })
    await nextTick()

    expect(store.posts.length).toBe(1)
    expect(store.posts[0].title).toBe('New Post')
  })

  it('updates a post', async () => {
    const store = usePostStore()

    await store.fetchPosts()
    await store.updatePost(1, { title: 'Updated Post', body: 'Updated Body', userId: 1 })
    await nextTick()

    expect(store.posts[0].title).toBe('Updated Post')
  })

  it('deletes a post', async () => {
    const store = usePostStore()

    await store.fetchPosts()
    await store.deletePost(1)
    await nextTick()

    expect(store.posts.length).toBe(0)
  })
})
