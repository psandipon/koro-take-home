import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseForm from '@/components/BaseComponents/BaseForm.vue'
import { z } from 'zod'

describe('BaseForm.vue', () => {
  const schema = z.object({
    name: z.string().min(1, 'Name is required')
  })

  it('emits error when form is invalid', async () => {
    const wrapper = mount(BaseForm, {
      props: { schema },
      slots: {
        default: '<input name="name" v-model="name" />'
      }
    })

    await wrapper.vm.validateForm()

    expect(wrapper.emitted('error')).toBeTruthy()
  })
})
