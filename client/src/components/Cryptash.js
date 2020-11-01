import App from '@core/App'
import {Component} from '../core/Component/Component'
import {Preloader} from './Preloader'
import {Login} from './Login'
import {Route} from '../core/Router/Router'
import {Register} from './Register'
import {Redirect} from '../core/Router/Redirect'

class Cryptash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggined: null,
      token: localStorage.getItem('token'),
    }
  }
  setToken(token) {
    console.log(token)
    this.setState({token})
    localStorage.setItem('token', token)
  }
  componentDidMount() {
    if (localStorage.getItem('token')) {
      fetch('http://localhost:9000/api/checkAuth', {
        method: 'POST',
        body: JSON.stringify({token: localStorage.getItem('token')}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((res) => res.json())
          .then((res) => this.setState({isLoggined: res.statusCode === 200}))
    } else {
      this.setState({isLoggined: false})
    }
  }

  render() {
    if (this.state.isLoggined === null) {
      return App.createElement(Preloader, {})
    }
    return App.createElement('div',
        {},
        App.createElement(Route, {
          path: '',
          exact: true,
          render: (props) => {
            if (!this.state.isLoggined) {
              return App.createElement(Redirect, {to: '#/login'})
            }
          },
        }),
        App.createElement(Route, {
          path: '#/login',
          exact: true,
          component: Login,
          props: {
            setToken: this.setToken.bind(this),
          },
        }),
        App.createElement(Route, {
          path: '#/register',
          exact: true,
          component: Register,
        })
    )
  }
}
export default Cryptash
