import {Component} from '../../core/Component/Component'
import App from '../../core/App'
import {generateKeyPair} from '../../utils/encryption/generateKeyPair'
import {encryptMessage} from '../../utils/encryption/encrypt'
import {decryptMessage} from '../../utils/encryption/decrypt'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem('token'),
    }
  }

  message() {
    const a = generateKeyPair()
    const b = generateKeyPair()
    const message = encryptMessage(a.private_key,
        {content: 'Hello world'},
        b.public_key)
    console.log(decryptMessage(b.private_key, message, a.public_key))
  }
  render() {
    return App.createElement('span', {onclick: (e) => {
      this.message()
    }}, this.state.token)
  }
}
export {Home}
