import {updateElement} from '../Element/updateElement'
import {updateComponent} from '../Component/updateComponent'
import {updateTextElement} from '../Text/updateTextElement'
import {render} from './render'

const update = (prevElement, nextElement, parent) => {
  if (!prevElement) {
    render(nextElement, parent)
    return
  }
  if (!nextElement && prevElement) {
    parent.removeChild(prevElement.dom)
    return
  }
  if (!nextElement && !prevElement) {
    return
  }
  if (prevElement.type) {
    if (prevElement.type === nextElement.type) {
      if (typeof prevElement.type === 'string') {
        updateElement(prevElement, nextElement)
      } else if (typeof prevElement.type === 'function') {
        updateComponent(prevElement, nextElement)
      }
    } else {
      parent.removeChild(prevElement.dom)
      render(nextElement, parent)
    }
  } else {
    updateTextElement(prevElement, nextElement)
  }
}
export {update}
