import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseHeader from '@/components/BaseComponents/BaseHeader.vue'

describe('BaseHeader.vue', () => {
  it('renders the title prop', () => {
    const wrapper = mount(BaseHeader, {
      props: { title: 'Test Title' }
    })
    expect(wrapper.find('h1').text()).toBe('Test Title')
  })

  it('renders slot content', () => {
    const wrapper = mount(BaseHeader, {
      props: { title: 'Test Title' },
      slots: {
        default: '<button>Click Me</button>'
      }
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Click Me')
  })
})
