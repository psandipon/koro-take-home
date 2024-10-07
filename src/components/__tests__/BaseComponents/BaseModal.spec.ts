import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '@/components/BaseComponents/BaseModal.vue'

describe('BaseModal.vue', () => {
  it('renders header slot content', () => {
    const wrapper = mount(BaseModal, {
      slots: {
        header: '<div class="header">Header Content</div>'
      }
    })
    expect(wrapper.find('.header').text()).toBe('Header Content')
  })

  it('renders default slot content', () => {
    const wrapper = mount(BaseModal, {
      slots: {
        default: '<div class="content">Main Content</div>'
      }
    })
    expect(wrapper.find('.content').text()).toBe('Main Content')
  })

  it('renders footer slot content', () => {
    const wrapper = mount(BaseModal, {
      slots: {
        footer: '<div class="footer">Footer Content</div>'
      }
    })
    expect(wrapper.find('.footer').text()).toBe('Footer Content')
  })

  it('emits close event when clicked outside the modal', async () => {
    const wrapper = mount(BaseModal, {
      attachTo: document.body
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
