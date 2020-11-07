import {render} from '../Utils/render'

const mountElement = (vElement, parent) => {
  const domNode = document.createElement(vElement.type)
  vElement.dom = domNode
  if (vElement.props.className) {
    domNode.className = vElement.props.className
  }
  const isProperty = (key) => key !== 'children'
  Object.keys(vElement.props)
      .filter(isProperty)
      .forEach((name) => {
        domNode[name] = vElement.props[name]
      })
  if (vElement.props.style !== undefined) {
    Object.keys(vElement.props.style)
        .forEach((sKey) => domNode.style[sKey] = vElement.props.style[sKey])
  }
  if (vElement.props.children) {
    vElement.props.children.forEach((child) => {
      render(child, domNode)
    })
  }
  parent.appendChild(domNode)
  return domNode
}
export {mountElement}
