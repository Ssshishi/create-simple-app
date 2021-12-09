import { makeAutoObservable } from 'mobx'

class BaseStore {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment = () => {
    this.count++
  }

  decrement = () => {
    this.count--
  }
}

const baseStore = new BaseStore()

export default baseStore
