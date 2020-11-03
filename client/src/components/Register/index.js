import {Component} from '../../core/Component/Component'
import App from '../../core/App'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
      isSame: false,
    }
  }

  handleRegister() {
    fetch('http://localhost:9000/api/register', {
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
      },
    })
    const loginButton = App.createElement('input', {
      type: 'submit',
      className: 'login--button',
      onclick: (e) => {
        e.preventDefault()
        this.handleRegister()
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
        loginButton)


    return App.createElement('div', {
      className: 'register--main login--div',
    }, form)
  }
}

export {Register}
