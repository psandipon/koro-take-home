import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from '@/components/AppLayouts/AppFooter.vue'

describe('AppFooter', () => {
  const wrapper = mount(AppFooter, {
    global: {
      stubs: {
        BaseButton: true
      }
    }
  })
  it('renders text', () => {
    expect(wrapper.text()).toContain('KoRo 2024')
  })
})
