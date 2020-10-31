import App from '@core/App'
import './index.scss'


class Login extends App.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
    }
  }

  handleLogin() {
    fetch('http://localhost:9000/api/login', {
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
    console.log(this.state)
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
        loginLabel, loginInput, passLabel, passInput, loginButton)

    const toSignUp = App.createElement('div', {
      className: 'login--signup',
    },
    App.createElement('span', {}, 'No account? '),
    App.createElement('a', {
      href: '#',
      className: 'login--signup-btn'},
    'Create account')
    )

    const main = App.createElement('div',
        {className: 'login--div'},
        title, form, toSignUp)
    return main
  }
}

export {Login}
