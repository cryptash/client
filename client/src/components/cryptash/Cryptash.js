import $ from 'doomerjs'
import { DomListener } from '../../core/DomListener'

export class Cryptash extends DomListener {
  constructor(selector, options) {
    super()
    this.$el = document.querySelector(selector)
    this.components = options.components || []
    this.page = window.localStorage.getItem('page')
  }
  getRoute() {

  }
  render() {
    this.components.forEach((Component) => {
      const _ = new Component({ name: 'HELLO' })
      const div = $.create('div', _.className)
      $(div).insertNodes(_.toSingleNode())
      this.$el.appendChild(div)
    })
    this.componentDidMount()
  }
}
