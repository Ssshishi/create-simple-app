import { observer } from 'mobx-react'
import { FC } from 'react'

import Layout from '@/layouts/default'

const App: FC = () => {
  return (
    <div className="App">
      <Layout />
    </div>
  )
}

export default observer(App)
