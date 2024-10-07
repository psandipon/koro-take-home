import { describe, it, expect, vi } from 'vitest'
import { registerBaseComponents } from '@/utils/registerBaseComponents'
import { createApp } from 'vue'
import * as BaseComponents from '@/components/BaseComponents'

describe('registerBaseComponents', () => {
  it('registers all base components', () => {
    const app = createApp({})
    const spy = vi.spyOn(app, 'component')

    registerBaseComponents(app)

    expect(spy).toHaveBeenCalledWith('BaseInput', BaseComponents.BaseInput)
    expect(spy).toHaveBeenCalledWith('BaseForm', BaseComponents.BaseForm)
    expect(spy).toHaveBeenCalledWith('BaseModal', BaseComponents.BaseModal)
    expect(spy).toHaveBeenCalledWith('BaseButton', BaseComponents.BaseButton)
    expect(spy).toHaveBeenCalledWith('BaseTable', BaseComponents.BaseTable)
    expect(spy).toHaveBeenCalledWith('BaseHeader', BaseComponents.BaseHeader)
    expect(spy).toHaveBeenCalledWith('BaseSelect', BaseComponents.BaseSelect)
  })
})
