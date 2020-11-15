import {mountComponent} from '../Component/mountComponent'
import {mountTextElement} from '../Text/mountTextElement'
import {mountElement} from '../Element/mountElement'

const render = (vElement, parent) => {
  if (vElement === null) {
    return null
  }
  if (typeof vElement.type === 'string') {
    return mountElement(vElement, parent)
  }
  if (typeof vElement === 'string') {
    return mountTextElement(vElement, parent)
  } else if (typeof vElement.type === 'function') {
    return mountComponent(vElement, parent)
  }
}

export {render}
