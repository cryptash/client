import {updateElement} from '../Element/updateElement'
import {updateComponent} from '../Component/updateComponent'

const update = (prevElement, nextElement) => {
  if (prevElement.tag === nextElement.tag) {
    if (typeof prevElement.tag === 'string') {
      updateElement(prevElement, nextElement)
    } else if (typeof prevElement.tag === 'function') {
      updateComponent(prevElement, nextElement)
    }
  } else {
    // const dom = render(nextElement)
  }
}
export {update}
