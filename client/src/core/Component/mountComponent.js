import {render} from '../Utils/render'

const mountComponent = (vComponent, parent) => {
  console.log(vComponent)
  const Component = vComponent.type
  const {props} = vComponent
  const instance = new Component(props)
  const vNode = instance.render()
  const dom = render(vNode, parent)

  vComponent.__instance = instance
  vComponent.dom = dom

  instance.__parentNode = parent
  parent.appendChild(dom)
  return dom
}

export {mountComponent}
