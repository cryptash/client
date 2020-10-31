import {updateTextElement} from '../Text/updateTextElement'
import {update} from './update'
import {render} from './render'

const updateChildren = (prevChildren, nextChildren, parent) => {
  if (!Array.isArray(nextChildren)) {
    nextChildren = [nextChildren]
  }
  if (!Array.isArray(prevChildren)) {
    prevChildren = [prevChildren]
  }

  for (let i = 0; i < nextChildren.length; i++) {
    const nextChild = nextChildren[i]
    const prevChild = prevChildren[i]
    if (typeof nextChild === 'string' && typeof prevChild === 'string') {
      updateTextElement(prevChild, nextChild, parent)
    } else {
      if (!prevChild) {
        render(nextChild, parent)
      } else {
        update(prevChild, nextChild)
      }
    }
  }
}
export {updateChildren}
