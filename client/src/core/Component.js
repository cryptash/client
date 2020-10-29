import {DomListener} from './DomListener'
import checkDifferences from './Diff'
import $ from 'doomerjs'
export class Component extends DomListener {
  constructor($root) {
    super()
    this.state = {}
    this.children = []
    this.name = ''
    this.$root = $root
    this.$main = $.create('div')
  }
  render($root) {}
  async componentDidMount() {}
  setState(state) {
    this.state = state
    this.update()
  }
  update() {
    let vMain = $.create('div')
    $(vMain).addClass(this.name).clear()
    this.children = []
    this.render(vMain)
    vMain = this.renderChildren(vMain)
    console.log(vMain)
    checkDifferences(this.$main, vMain)
  }
  renderToRoot() {
    $(this.$main).addClass(this.name).clear()
    this.children = []
    this.render(this.$main)
    this.$main = this.renderChildren(this.$main)
    this.$root.append(this.$main)
  }
  renderChildren($main) {
    console.log(this.children)
    this.children.forEach((Component) => {
      if (typeof Component.Instance === 'function') {
        const _ = new Component.Instance($main)
        _.renderToRoot()
      } else {
        $main.appendChild(Component)
      }
    })
    this.componentDidMount()
    return $main
  }
}
