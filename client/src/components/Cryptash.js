import App from '@core/App'
import {Component} from '../core/Component/Component'

class Cryptash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
  }
  render() {
    return App.createElement('div', {className: 'div--main'}, 'Hello World')
  }
}
export default Cryptash
