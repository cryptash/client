import {DomListener} from './DomListener'
import $ from 'doomerjs'
export class Component extends DomListener {
  constructor($root) {
    super()
    this.state = {}
    this.childrenNodes = []
    this.childrenComponents = []
    this.name = ''
    this.$root = $root
    this.$main = $.create('div')
  }
  render($root) {}
  async componentDidMount() {}
  setState(state) {
    this.state = state
    this.renderToRoot()
  }
  renderToRoot() {
    $(this.$main).addClass(this.name).clear()
    this.childrenNodes = []
    this.childrenComponents = []
    this.render(this.$main)
    this.main = this.renderChildren()
    this.$root.append(this.$main)
  }
  renderChildren() {
    this.childrenComponents.forEach((Component) => {
      const _ = new Component.Instance(this.$main)
      _.renderToRoot()
    })
    this.componentDidMount()
    return this.$main
  }
}
