import {Component} from '../../core/Component/Component'
import App from '../../core/App'

class Register extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return App.createElement('h1', {}, 'register')
  }
}

export {Register}
