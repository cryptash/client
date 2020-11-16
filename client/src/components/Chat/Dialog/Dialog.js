import App from '../../../core/App'
import './Dialog.scss'
import {encryptMessage} from '../../../utils/encryption/encrypt'
import {MessageInput} from './MessageInput'
import {Message} from './Message'
import {Preloader} from '../../Preloader'

class Dialog extends App.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      messages: [],
      pub_key: '',
      chatId: this.props.param.id,
      pg: 0,
      user2_picture_url: '',
      user2_username: '',
    }
  }
  sendMessage(text) {
    this.props.socket.send(JSON.stringify(
        {
          action: 'send_message',
          chatId: this.state.chatId,
          content: encryptMessage(
              localStorage.getItem('key'),
              {
                text,
              },
              this.state.pub_key
          ),
          token: localStorage.getItem('token'),
        }
    ))
  }
  sendMessagesRequest(pg) {
    this.props.socket.send(
        JSON.stringify(
            {
              action: 'get_messages',
              chat_id: this.state.chatId,
              pg: pg,
              jwt: localStorage.getItem('token'),
            }
        )
    )
  }
  initialize() {
    const chat = this.props.chats.filter(
        (x) => x.chat_id === this.props.param.id
    )[0]
    this.setState({
      chatId: this.props.param.id,
      pub_key: chat['Users'][0].pub_key,
      user2_picture_url: chat['Users'][0].picture_url,
      user2_username: chat['Users'][0].username,
    })
  }
  componentDidMount() {
    this.initialize()
    window.addEventListener('hashchange', () => {
      this.initialize()
      this.sendMessagesRequest(0)
    })
    this.props.socket.addEventListener('message', (event) => {
      const content = JSON.parse(event.data)
      if (content.action === 'get_messages') {
        if (content.statusCode === 200) {
          if (this.state.pg === 0) {
            this.setState({
              messages: content.messages,
            })
          } else {
            this.setState({
              messages: [...this.state.messages, ...content.messages],
            })
          }
        }
      }
      if (content.action === 'new_message') {
        if (content.data.message.chat_id === this.state.chatId) {
          this.setState({
            messages: [...this.state.messages, content.data.message],
          })
        }
      }
    })
    if (this.props.socket.readyState === 0) {
      this.props.socket.addEventListener('open', () => {
        this.sendMessagesRequest(0)
      })
    } else {
      this.sendMessagesRequest(0)
    }
  }

  render() {
    const messages = []
    if (!messages) {
      return App.createElement(Preloader)
    }
    this.state.messages.forEach((e) => {
      messages.push(
          App.createElement(Message,
              {
                ...e,
                picture_url: [
                  this.props.picture_url,
                  this.state.user2_picture_url,
                ],
                username: [
                  this.props.username,
                  this.state.user2_username,
                ],
                pub_key: this.state.pub_key,
              })
      )
    })
    const messagesList = App.createElement('div', {
      className: 'dialog-messages scrollbar--light-reversed',
    }, ...messages)
    const vMain = App.createElement('div',
        {
          className: '',
        },
        messagesList,
        App.createElement(
            MessageInput,
            {
              sendMessage: (text) => this.sendMessage(text),
            }
        ))
    return vMain
  }
}
export {Dialog}
