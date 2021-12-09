import { FC, memo, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import routes from '@/router'

const Layout: FC = memo(() => {
  return (
    <HashRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          {routes.map((route) => {
            const { component: C, exact, path } = route
            return <Route path={path} element={<C />} key={path} />
          })}
        </Routes>
      </Suspense>
    </HashRouter>
  )
})

export default Layout
