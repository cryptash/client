import {Component} from '../Component/Component'

class Redirect extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {to} = this.props
    window.history.replaceState({}, null, to)
  }

  render() {
    return null
  }
}

export {Redirect}
