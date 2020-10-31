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
    const _ = App.createElement('div', {className: 'main'})
    // const h1 = App.createElement('h1', {className: 'title'}, 'Hello')
    // const a = App.createElement('a', {href: '#'}, 'Hello')
    // eslint-disable-next-line max-len
    const input = App.createElement('input', {type: 'text', placeholder: 'enter text', onkeyup: (e) => this.setState({name: e.target.value})})
    _.props.children.push(input)
    _.props.children.push(App.createElement('a', {href: '#'}, this.props.name))
    return _
  }
}
export default Cryptash
