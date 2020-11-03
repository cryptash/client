import './index.scss'
import {Component} from '../../core/Component/Component'
import App from '../../core/App'
import {generateKeyPair} from '../../utils/encryption/generateKeyPair'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
      isSame: false,
      private_key: null,
      public_key: null,
      isOk: false,
    }
  }
  componentDidMount() {
    const {private_key, public_key} = generateKeyPair()
    localStorage.setItem('key', private_key)
    this.setState({
      private_key,
      public_key,
    })
  }

  handleRegister() {
    alert('Write down the key!')
    alert(this.state.private_key)
    fetch('http://localhost:9000/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.login,
        password: this.state.password,
        pub_key: this.state.public_key,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          if (res.statusCode !== 200) {
            alert(res.message)
          } else {
            this.props.setToken(res.token)
          }
        })
  }
  render() {
    console.log(this.state)
    const usernameRegexp = /^[a-zA-Z0-9_-]{3,16}$/
    // eslint-disable-next-line max-len
    const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,31}$/ // 8 to 31 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
    const loginLabel = App.createElement('label', {
      'for': 'c-login',
    },
    App.createElement('i',
        {className: 'material-icons-outlined'},
        'account_box'),
    App.createElement('span', {}, 'Username'))
    const loginInput = App.createElement('input', {
      type: 'text',
      name: 'c-login',
      className: 'login--input',
      placeholder: 'Username',
      oninput: (e) => {
        if (!usernameRegexp.exec(e.target.value)) {
          document.getElementsByClassName('login--input')[0]
              .classList.add('error')
          this.setState({isOk: false})
        } else {
          document.getElementsByClassName('login--input')[0]
              .classList.remove('error')
          this.setState({isOk: true})
        }
        this.setState({login: e.target.value})
      },
    })
    const passLabel = App.createElement('label', {
      'for': 'c-pass',
    },
    App.createElement('i',
        {className: 'material-icons-outlined'},
        'lock outline'),
    App.createElement('span', {}, 'Password'))
    const passInput = App.createElement('input', {
      type: 'password',
      name: 'c-pass',
      className: 'password--input',
      validate: 'Password is required',
      placeholder: 'Password',
      oninput: (e) => {
        if (!passwordRegexp.exec(e.target.value)) {
          document.getElementsByClassName('password--input')[0]
              .classList.add('error')
          this.setState({isOk: false})
        } else {
          document.getElementsByClassName('password--input')[0]
              .classList.remove('error')
          this.setState({isOk: true})
        }
        this.setState({password: e.target.value})
      },
    })
    const passVerLabel = App.createElement('label', {
      'for': 'c-pass',
    },
    App.createElement('i',
        {className: 'material-icons-outlined'},
        'lock outline'),
    App.createElement('span', {}, 'Verify Password'))
    const passVerInput = App.createElement('input', {
      type: 'password',
      name: 'c-pass',
      className: 'password--input',
      validate: 'Password is required',
      placeholder: 'Password',
      oninput: (e) => {
        this.setState({isSame: e.target.value === this.state.password})
        if (!e.target.value === this.state.password) {
          document.getElementsByClassName('password--input')[1]
              .classList.add('error')
          this.setState({isOk: false})
        } else {
          document.getElementsByClassName('password--input')[1]
              .classList.remove('error')
          this.setState({isOk: true})
        }
      },
    })
    const privateKeySpan = App.createElement('span', {
      className: 'register--key',
    },
    App.createElement('span',
        {className: 'register--key---description'},
        `Please write this key down, or save it to a safe place.
        If you will lose it, you will lose access to your messages.
        We doesn't store it on server`
    ),
    App.createElement('pre', {}, this.state.private_key)
    )
    const loginButton = App.createElement('input', {
      type: 'submit',
      className: 'login--button',
      onclick: (e) => {
        e.preventDefault()
        if (this.state.isOk && this.state.isSame) {
          this.handleRegister()
        }
      },
      value: 'Register',
    })
    const form = App.createElement('form',
        {},
        loginLabel,
        loginInput,
        passLabel,
        passInput,
        passVerLabel,
        passVerInput,
        privateKeySpan,
        loginButton)


    return App.createElement('div', {
      className: 'register--main login--div',
    }, form)
  }
}

export {Register}
