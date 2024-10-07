import { h } from 'vue'
import { moon, sun } from '@/assets'
import { ButtonSize, ButtonVariant } from '@/types'
import { useDark, useToggle } from '@vueuse/core'
import { BaseButton } from '@/components/BaseComponents'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const useDarkMode = () => {
  const darkModeToggle = () => {
    return h(BaseButton, {
      onClick: () => toggleDark(),
      size: ButtonSize.Sm,
      variant: ButtonVariant.Secondary,
      icon: isDark.value ? sun : moon
    })
  }

  return {
    isDark,
    toggleDark,
    darkModeToggle
  }
}

export default useDarkMode
