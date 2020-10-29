import {Component} from '../../core/Component'
import $ from 'doomerjs'

export class LoginFormComponent extends Component {
  constructor($root) {
    super($root)
    this.name = 'LoginForm'
    this.state = {
      login: '',
      password: '',
    }
  }
  handleSubmit() {
    console.log(this.state)
  }
  render($root) {
    // const $form_div = $.create('div', 'LoginForm-div')
    const $name_input = $.create('input', 'login--input')
    const $password_input = $.create('input', 'password--input')
    const $submit_button = $.create('button', 'submit--button')
    $($name_input)
        .attr('type', 'text')
        .on('keyup', (e) => {
          this.setState({
            ...this.state,
            login: e.target.value,
          })
        }).attr('placeholder', this.state.login)
    $($password_input)
        .attr('type', 'password')
        .on('keyup', (e) => {
          this.setState({
            ...this.state,
            password: e.target.value,
          })
        }).attr('placeholder', this.state.login)
    $($submit_button).on('click', () => this.handleSubmit()).setText('Login')
    const $h1 = $.create('h1', 'title')
    $h1.innerText = this.state.login
    this.children.push($h1, $name_input, $password_input, $submit_button)
    console.log(this.children)
    // this.childrenNodes.forEach((e) => {
    //   $($form_div).appendChild(e)
    // })
  }
}
