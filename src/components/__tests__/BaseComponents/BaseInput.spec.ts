import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from '@/components/BaseComponents/BaseInput.vue'

describe('BaseInput.vue', () => {
  it('renders the label text', () => {
    const wrapper = mount(BaseInput, {
      props: { name: 'test', labelText: 'Test Label', modelValue: '' }
    })
    expect(wrapper.find('[data-test="base-input-label"]').text()).toBe('Test Label')
  })

  it('renders an input element by default', () => {
    const wrapper = mount(BaseInput, {
      props: { name: 'test', modelValue: '' }
    })
    expect(wrapper.find('[data-test="base-input"]').exists()).toBe(true)
  })

  it('renders a textarea when inputKind is textarea', () => {
    const wrapper = mount(BaseInput, {
      props: { name: 'test', modelValue: '', inputKind: 'Textarea' }
    })
    expect(wrapper.find('[data-test="base-textarea"]').exists()).toBe(true)
  })

  it('updates modelValue when input changes', async () => {
    const wrapper = mount(BaseInput, {
      props: { name: 'test', modelValue: '' }
    })
    const input = wrapper.find('[data-test="base-input"]')
    await input.setValue('New Value')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted && emitted[0]).toEqual(['New Value'])
  })
})
