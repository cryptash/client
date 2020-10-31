import {render} from '../Utils/render'

const mountElement = (vElement, parent) => {
  const domNode = document.createElement(vElement.type)
  vElement.dom = domNode
  if (vElement.props.className) {
    domNode.className = vElement.props.className
  }
  if (vElement.props.children) {
    vElement.props.children.forEach((child) => {
      console.log(vElement.props.children)
      render(child, parent)
    })
  }
  parent.appendChild(domNode)
  return domNode
}
export {mountElement}
