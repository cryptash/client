import {updateElement} from '../Element/updateElement'
import {updateComponent} from '../Component/updateComponent'
import {updateTextElement} from '../Text/updateTextElement'
import {render} from './render'

const update = (prevElement, nextElement) => {
  console.log(prevElement, nextElement)
  if (prevElement.type) {
    if (prevElement.type === nextElement.type) {
      if (typeof prevElement.type === 'string') {
        updateElement(prevElement, nextElement)
      } else if (typeof prevElement.type === 'function') {
        updateComponent(prevElement, nextElement)
      }
    } else {
      const parent = prevElement.dom.parentNode
      parent.removeChild(prevElement.dom)
      render(nextElement, parent)
    }
  } else {
    updateTextElement(prevElement, nextElement)
  }
}
export {update}
