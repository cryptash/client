// import $ from 'doomerjs'

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
      console.log(this.$el)
      const _ = new Component(this.$el)
      _.renderToRoot()
    })
    this.componentDidMount()
  }
}
