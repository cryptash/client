// import $ from 'doomerjs'

import {Component} from '@core/Component'
import {LoginFormComponent} from './LoginForm'

export class LoginComponent extends Component {
  constructor(props) {
    super()
    this.props = props
    this.className = 'login-main'
    this.name = 'Login'
    console.log(this)
    return this
  }

  render() {
    this.childrenComponents.push(
        {Instance: LoginFormComponent, props: {
          name: 'Hello',
        }})
  }
}
