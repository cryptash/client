import App from '@core/App'
import './index.scss'
import {Link} from '../../core/Router/Link'


class Login extends App.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
    }
  }

  handleLogin() {
    fetch('https://' + window.location.host + '/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.login,
        password: this.state.password,
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
    // console.log(this.state)
    const title = App.createElement('h1',
        {className: 'login--title'},
        'Welcome to Cryptash')
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
        this.setState({password: e.target.value})
      },
    })
    const keyLabel = App.createElement('label', {
      'for': 'c-pass',
    },
    App.createElement('i',
        {className: 'material-icons-outlined'},
        'vpn_key outline'),
    App.createElement('span', {}, 'Private Key'))
    const keyInput = App.createElement('input', {
      type: 'password',
      name: 'c-key',
      className: 'key--input',
      validate: 'Password is required',
      placeholder: 'Private Key',
      oninput: (e) => {
        localStorage.setItem('key', e.target.value)
      },
    })
    const loginButton = App.createElement('input', {
      type: 'submit',
      className: 'login--button',
      onclick: (e) => {
        e.preventDefault()
        this.handleLogin()
      },
      value: 'Login',
    })
    const form = App.createElement('form',
        {},
        loginLabel, loginInput, passLabel,
        passInput, keyLabel, keyInput, loginButton)

    const toSignUp = App.createElement('div', {
      className: 'login--signup',
    },
    App.createElement('span', {}, 'No account? '),
    App.createElement(Link,
        {to: '#/register',
          className: 'login--signup-btn',
          children: ['Create Account']},
    ))

    const main = App.createElement('div',
        {className: 'login--div'},
        title, form, toSignUp)
    return main
  }
}

export {Login}
