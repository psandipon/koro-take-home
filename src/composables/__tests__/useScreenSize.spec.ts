import { describe, test, expect, vi } from 'vitest'
import useScreenSize from '@/composables/useScreenSize'
import { ref } from 'vue'

vi.mock('@vueuse/core', () => ({
  useBreakpoints: vi.fn(() => ({
    greaterOrEqual: vi.fn(() => ref(true))
  })),
  breakpointsTailwind: {}
}))

describe('useScreenSize', () => {
  test('returns smOrGreater as true when screen size is greater than or equal to "sm"', () => {
    const { smOrGreater } = useScreenSize()
    expect(smOrGreater.value).toBe(true)
  })

  test('returns activeBreakpoints', () => {
    const { activeBreakpoints } = useScreenSize()
    expect(activeBreakpoints).toBeDefined()
    expect(activeBreakpoints.greaterOrEqual).toBeDefined()
  })
})
