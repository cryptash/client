import {updateChildren} from '../Utils/updateChildren'

const updateElement = (prevElement, nextElement) => {
  const dom = prevElement.dom
  nextElement.dom = dom
  const nextStyle = nextElement.props.style

  if (nextElement.props.children) {
    updateChildren(prevElement.props.children, nextElement.props.children, dom)
  }


  if (prevElement.style !== nextStyle) {
    Object.keys(nextStyle).forEach((s) => dom.style[s] = nextStyle[s])
  }
}
export {updateElement}
