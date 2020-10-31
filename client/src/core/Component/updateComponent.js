import {update} from '../Utils/update'

const updateComponent = (prevComponent, nextComponent) => {
  const { _instance } = prevComponent
  const { _currentElement } = _instance

  const nextProps = nextComponent.props

  nextComponent.dom = prevComponent.dom
  nextComponent._instance = _instance
  nextComponent._instance.props = nextProps

  if (_instance.shouldComponentUpdate()) {
    const prevRenderedElement = _currentElement
    const nextRenderedElement = _instance.render()
    nextComponent._instance._currentElement = nextRenderedElement
    // call update
    update(prevRenderedElement, nextRenderedElement, _instance._parentNode)
  }
}
export {updateComponent}
