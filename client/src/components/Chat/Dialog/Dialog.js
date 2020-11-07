import App from '../../../core/App'
import './Dialog.scss'
import {encryptMessage} from '../../../utils/encryption/encrypt'

class Dialog extends App.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
    }
  }
  sendMessage() {
    console.log({
      action: 'send_message',
      chatId: this.props.param.username,
      content: this.state.content,
      token: localStorage.getItem('token'),
    })
    const chat = this.props.chats.filter(
        (x) => x.chat_id === this.props.param.username
    )[0]
    const p_key = chat['Users'][0].pub_key
    console.log(chat)
    this.props.socket.send(JSON.stringify(
        {
          action: 'send_message',
          chatId: this.props.param.username,
          content: encryptMessage(
              localStorage.getItem('key'),
              {
                text: this.state.content,
              },
              p_key
          ),
          token: localStorage.getItem('token'),
        }
    ))
  }
  render() {
    console.log(this.props)
    const input = App.createElement('input', {
      type: 'text',
      oninput: (e) => {
        this.setState({content: e.target.value})
      },
    })
    const button = App.createElement('button', {
      onclick: () => this.sendMessage(),
    })
    const vMain = App.createElement('div',
        {}, input, button)
    return vMain
  }
}
export {Dialog}
