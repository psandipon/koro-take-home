import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { nextTick } from 'vue'

vi.mock('@/composables', () => ({
  useAxios: () => ({
    get: vi.fn(() => Promise.resolve({ data: [{ id: 1, name: 'John Doe' }] }))
  })
}))

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches and sets users', async () => {
    const store = useUserStore()

    expect(store.users.length).toBe(0)

    await store.fetchUsers()
    await nextTick()

    expect(store.users.length).toBe(1)
    expect(store.users[0].name).toBe('John Doe')
  })

  it('populates usersMap correctly after fetching', async () => {
    const store = useUserStore()

    await store.fetchUsers()
    await nextTick()

    expect(store.usersMap[1].name).toBe('John Doe')
  })

  it('returns getUsers correctly as computed property', async () => {
    const store = useUserStore()

    await store.fetchUsers()
    await nextTick()

    expect(store.getUsers.length).toBe(1)
    expect(store.getUsers[0].label).toBe('John Doe')
  })
})
