import {render} from '../Utils/render'

const mountComponent = (vComponent, parent) => {
  const Component = vComponent.type
  const {props} = vComponent
  const instance = new Component(props)
  const vNode = instance.render()
  const dom = render(vNode, parent)

  vComponent._instance = instance
  vComponent.dom = dom

  instance._parentNode = parent
  instance._currentElement = vNode

  if (dom) {
    parent.appendChild(dom)
  }
  instance.componentDidMount()

  return dom
}

export {mountComponent}
