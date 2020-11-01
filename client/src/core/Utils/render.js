import {mountComponent} from '../Component/mountComponent'
import {mountTextElement} from '../Text/mountTextElement'
import {mountElement} from '../Element/mountElement'

const render = (vElement, parent) => {
  if (vElement === null) {
    return null
  }
  if (typeof vElement.type === 'string') {
    console.log('element', vElement)
    return mountElement(vElement, parent)
  }
  if (typeof vElement === 'string') {
    console.log('text', vElement)
    return mountTextElement(vElement, parent)
  } else if (typeof vElement.type === 'function') {
    console.log('component', vElement)
    return mountComponent(vElement, parent)
  }
}

export {render}
