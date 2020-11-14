import App from '@core/App'
import {decryptMessage} from '../../../utils/encryption/decrypt'
import {UserPicture} from '../UserPicture'

class Message extends App.Component {
  constructor(props) {
    super(props)
  }
  decrypt() {
    try {
      return decryptMessage(
          localStorage.getItem('key'),
          this.props.content,
          this.props.pub_key,
      ).text
    } catch (e) {
      console.log(e)
      return ' '
    }
  }
  render() {
    const content = this.decrypt()
    if (!content || content === ' ') return null
    const text = App.createElement('span', {
    }, content)
    const bubble = App.createElement('div', {
      className: 'dialog-message_bubble',
    }, text)
    const picture = App.createElement(UserPicture, {
      picture_url: this.props.picture_url[this.props.isMe ? 0 : 1],
      username: this.props.username[this.props.isMe ? 0 : 1],
    })
    const upperContent = App.createElement('div',
        {
          className: 'dialog-message--upper',
        }, picture, bubble)
    const date = App.createElement('span', {
      className: 'dialog-message--date',
    }, new Date(this.props.date).toLocaleTimeString(undefined, {

    }))
    const vMain = App.createElement('div', {
      className: `dialog-message ${this.props.isMe ? 'fromMe' : 'toMe'}`,
    }, upperContent, date)
    return vMain
  }
}

export {Message}
