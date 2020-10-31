import {render} from '../Utils/render'

const mountComponent = (vComponent, parent) => {
  console.log(vComponent)
  const Component = vComponent.type
  const {props} = vComponent
  const instance = new Component(props)
  const vNode = instance.render()
  const dom = render(vNode, parent)

  vComponent._instance = instance
  vComponent.dom = dom

  instance._parentNode = parent
  instance._currentElement = vNode

  parent.appendChild(dom)
  return dom
}

export {mountComponent}
