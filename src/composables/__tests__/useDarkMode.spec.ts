import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { ButtonSize, ButtonVariant } from '@/types'
import useDarkMode from '@/composables/useDarkMode'
import { BaseButton } from '@/components/BaseComponents'
import { moon } from '@/assets'

describe('useDarkMode', () => {
  it('returns isDark, toggleDark, and darkModeToggle', () => {
    const { isDark, toggleDark, darkModeToggle } = useDarkMode()

    expect(isDark.value).toBe(false)
    expect(toggleDark).toBeInstanceOf(Function)

    const button = darkModeToggle()

    expect(button).toEqual(
      h(BaseButton, {
        onClick: expect.any(Function),
        size: ButtonSize.Sm,
        variant: ButtonVariant.Secondary,
        icon: moon
      })
    )
  })
})
