import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppLayouts/AppHeader.vue'

describe('AppHeader', () => {
  it('renders text', () => {
    const wrapper = mount(AppHeader, {})
    expect(wrapper.text()).toContain('Post Management')
  })
})
