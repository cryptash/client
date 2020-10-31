import {update} from '../Utils/update'

class Component {
  constructor(props) {
    this.props = props
    this.state = this.state || {}

    this._currentElement = null
    this._pendingState = null
    this._parentNode = null
  }

  setState(newState) {
    this.state = Object.assign({}, this.state, newState)
    this.updateComponent()
  }
  shouldComponentUpdate() {
    return true
  }
  updateComponent() {
    const prevState = this.state
    const prevElement = this._currentElement

    if (this._pendingState !== prevState) {
      this.state = this._pendingState
    }

    this._pendingState = null
    const nextElement = this.render()
    this._currentElement = nextElement

    update(prevElement, nextElement, this._parentNode)
  }
  render() {}
}
export {Component}
