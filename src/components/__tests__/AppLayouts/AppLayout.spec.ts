import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppLayout from '@/components/AppLayouts/AppLayout.vue'
import Header from '@/components/AppLayouts/AppHeader.vue'
import Footer from '@/components/AppLayouts/AppFooter.vue'

describe('AppLayout', () => {
  it('renders the Header component', () => {
    const wrapper = shallowMount(AppLayout, {
      global: {
        stubs: {
          'router-view': true
        }
      }
    })
    expect(wrapper.findComponent(Header).exists()).toBe(true)
  })

  it('renders the Footer component', () => {
    const wrapper = shallowMount(AppLayout, {
      global: {
        stubs: {
          'router-view': true
        }
      }
    })
    expect(wrapper.findComponent(Footer).exists()).toBe(true)
  })

  it('renders a router-view element', () => {
    const wrapper = shallowMount(AppLayout, {
      global: {
        stubs: {
          'router-view': true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'router-view' }).exists()).toBe(true)
  })
})
