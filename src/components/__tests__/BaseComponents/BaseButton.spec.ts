import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'

describe('BaseButton.vue', () => {
  it('renders button text when not loading and no icon', () => {
    const wrapper = mount(BaseButton, {
      props: { text: 'Click Me' }
    })
    expect(wrapper.text()).toBe('Click Me')
  })

  it('renders icon when icon prop is provided', () => {
    const wrapper = mount(BaseButton, {
      props: { icon: 'icon.png' }
    })
    const icon = wrapper.find('img.icon')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('src')).toBe('icon.png')
  })

  it('renders loader when loading is true', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true }
    })
    const loader = wrapper.find('img.loader')
    expect(loader.exists()).toBe(true)
  })

  it('emits click event when not loading or disabled', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click event when loading is true', async () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click event when disabled is true', async () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
