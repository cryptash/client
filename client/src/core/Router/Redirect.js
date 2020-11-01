import {Component} from '../Component/Component'

class Redirect extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {to} = this.props
    window.history.pushState({}, null, to)
  }

  render() {
    return null
  }
}

export {Redirect}
