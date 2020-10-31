import App from '@core/App'
import {Component} from '../core/Component/Component'
import {Preloader} from './Preloader'
import {Login} from './Login'

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
    if (this.state.isLoggined === false) {
      return App.createElement(Login, {setToken: this.setToken.bind(this)})
    } else {
      return App.createElement('h1', {}, 'Homepage')
    }
  }
}
export default Cryptash
