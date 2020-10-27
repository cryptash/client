import {Component} from '../../core/Component'
import $ from 'doomerjs'

export class LoginFormComponent extends Component {
  constructor() {
    super()
    this.name = 'LoginForm'
    this.state = {
      login: '',
      password: '',
    }
  }
  handleSubmit() {
    console.log(this.state)
  }
  render() {
    const $form_div = $.create('div', 'LoginForm-div')
    const $name_input = $.create('input', 'login--input')
    const $password_input = $.create('input', 'password--input')
    const $submit_button = $.create('button', 'submit--button')
    $($name_input)
        .attr('type', 'text')
        .on('keyup', (e) => {
          this.state.login = e.target.value
        }).attr('placeholder', 'Login')
    $($password_input)
        .attr('type', 'password')
        .on('keyup', (e) => {
          this.state.password = e.target.value
        }).attr('placeholder', 'Password')
    $($submit_button).on('click', () => this.handleSubmit()).setText('Login')
    this.childrenNodes.push($name_input, $password_input, $submit_button)
    console.log(this.childrenNodes)
    this.childrenNodes.forEach((e) => {
      $($form_div).appendChild(e)
    })
    this.$root.appendChild($form_div)
  }
}
