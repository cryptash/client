import {DomListener} from './DomListener'
import $ from 'doomerjs'
export class Component extends DomListener {
  constructor() {
    super()
    this.state = {}
    this.childrenNodes = []
    this.childrenComponents = []
    this.name = ''
    this.$root = $.create('div')
  }
  render() {}
  async componentDidMount() {}
  setState(state) {

  }
  toSingleNode() {
    $(this.$root).addClass(this.name)
    this.render()
    this.childrenComponents.forEach((Component) => {
      const _ = new Component.Instance(Component.props)
      $(this.$root).insertNodes(_.toSingleNode())
    })
    this.componentDidMount()
    return this.$root
  }
}
