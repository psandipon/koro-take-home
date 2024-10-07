import type { User } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAxios } from '@/composables'

const { get } = useAxios()

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const usersMap = ref<Record<number, User>>({})

  // as computed properties are memoized,
  // below computed property will only be recalculated when users.value changes
  const getUsers = computed(() =>
    users.value.map((user) => ({
      label: user.name,
      value: user.id
    }))
  )

  const mutateUsersData = (newUsers: User[]) => {
    users.value = newUsers
    // Building a map for later, O(1) access
    usersMap.value = newUsers.reduce((acc, user) => ({ ...acc, [user.id]: user }), {})
  }

  // Note: error handling is implemented at useAxios.ts composable
  const fetchUsers = async () => {
    const response = await get<User[]>('/users')
    mutateUsersData(response?.data ?? [])
  }

  return {
    users,
    usersMap,
    getUsers,
    fetchUsers
  }
})
