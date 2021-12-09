import './index.less'

import { Button } from 'antd'
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import baseStore from '@/store'

const HelloWorld: FC = observer(() => {
  const [baseState] = useState(() => baseStore)

  return (
    <div className="hello-world">
      <h3>Hello Cishy!</h3>
      <p>{baseState.count}</p>
      <Button type="primary" onClick={() => baseState.increment()}>
        +1
      </Button>
      <Button type="primary" onClick={() => baseState.decrement()}>
        -1
      </Button>
    </div>
  )
})

export default HelloWorld
