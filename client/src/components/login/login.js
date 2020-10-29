// import $ from 'doomerjs'

import {Component} from '@core/Component'
import {LoginFormComponent} from './LoginForm'

export class LoginComponent extends Component {
  constructor($root) {
    super($root)
    this.className = 'login-main'
    this.name = 'Login'
    console.log(this)
    return this
  }

  render() {
    this.children.push(
        {Instance: LoginFormComponent, props: {
          name: 'Hello',
        }})
  }
}
