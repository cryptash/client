import {Component} from '../Component/Component'
import App from '../App'

class Link extends Component {
  constructor(props) {
    super(props)
  }
  handleClick(e) {
    e.preventDefault()
    const {to} = this.props
    history.pushState({}, null, to)
  }
  render() {
    console.log(this.props)
    const {to, children} = this.props
    return App.createElement('a', {
      href: to,
      onclick: (e) => this.handleClick,
      ...this.props,
    }, ...children)
  }
}

export {Link}
