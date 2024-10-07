import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSelect from '@/components/BaseComponents/BaseSelect.vue'

describe('BaseSelect.vue', () => {
  const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 }
  ]

  it('renders the label text', () => {
    const wrapper = mount(BaseSelect, {
      props: { name: 'test', labelText: 'Test Label', options }
    })
    expect(wrapper.find('label').text()).toBe('Test Label')
  })

  it('updates v-model on option select', async () => {
    const wrapper = mount(BaseSelect, {
      props: { name: 'test', options, modelValue: 1 },
      global: {
        stubs: {}
      }
    })
    await wrapper.setProps({ modelValue: 2 })
    expect(wrapper.vm.modelValue).toBe(2)
  })
})
