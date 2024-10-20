import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/userStore'

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches and sets users and usersMap', async () => {
    const userStore = useUserStore()

    expect(userStore.users.length).toBe(0)
    await userStore.fetchUsers()
    expect(userStore.users.length).toBe(10)
    expect(userStore.usersMap[1].name).toBe(userStore.users[0].name)
  })

  it('returns getUsers correctly as computed property', async () => {
    const userStore = useUserStore()

    await userStore.fetchUsers()
    const randomIndex = Math.floor(Math.random() * 10)
    expect(userStore.getUsers.length).toBe(10)
    expect(userStore.getUsers[randomIndex].label).toBe(userStore.users[randomIndex].name)
  })
})
