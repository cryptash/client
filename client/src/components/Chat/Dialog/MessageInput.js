import App from '../../../core/App'

class MessageInput extends App.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
  }
  render() {
    const button = App.createElement('button', {
      'type': 'submit',
      'value': '',
    },
    App.createElement('i', {
      className: 'material-icons-sharp',
    }, 'send')
    )
    const input = App.createElement('input', {
      className: 'dialog-input_text',
      placeholder: 'Write a message...',
      oninput: (e) => {
        this.setState({text: e.target.value})
      },
    })
    const form = App.createElement('form', {
      className: 'dialog-input_form',
      name: 'message',
      onsubmit: (e) => {
        e.preventDefault()
        this.props.sendMessage(this.state.text)
        e.target.reset()
      },
    }, input, button)
    const vMain = App.createElement('div', {
      className: 'dialog-input',
    }, form)
    return vMain
  }
}
export {MessageInput}
