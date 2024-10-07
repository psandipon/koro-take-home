import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const PostList = () => import('@/views/PostList.vue')
const Layout = () => import('@/components/AppLayouts/AppLayout.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: PostList
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
