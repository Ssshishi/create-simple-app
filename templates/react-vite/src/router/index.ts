import { ComponentType, lazy, LazyExoticComponent } from 'react'

interface RouteRecord {
  component: LazyExoticComponent<ComponentType<any>>
  path: string
  name?: string
  exact?: boolean
  meta?: Record<string, unknown>
}

const routes: RouteRecord[] = [
  {
    path: '/',
    name: 'HelloWorld',
    component: lazy(() => import('@/pages/hello-world')),
  },
]

export default routes
