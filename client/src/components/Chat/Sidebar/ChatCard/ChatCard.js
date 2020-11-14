import {Component} from '../../../../core/Component/Component'
import App from '../../../../core/App'
import {decryptMessage} from '../../../../utils/encryption/decrypt'

class ChatCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {data} = this.props
    const picture_div = App.createElement('div', {
      className: 'chat-card--picture',
    })
    if (data['Users'][0].picture_url.includes('http')) {
      const profile_img = App.createElement('img', {
        src: data['Users'][0].picture_url,
        className: 'chat-card--picture_image',
      })
      picture_div.props.children.push(profile_img)
    } else {
      const profile_text = App.createElement('span', {
        className: 'chat-card--picture_span',
      }, data['Users'][0].username[0].toUpperCase())
      picture_div.props.style = {
        background: data['Users'][0].picture_url,
      }
      picture_div.props.children.push(profile_text)
    }


    const chat_name = App.createElement('span', {
      className: 'chat-card--data_upper__name',
    }, data['Users'][0].username)

    const chat_date = App.createElement('span', {
      className: 'chat-card--data_upper__date',
    }, data['Messages'][0] ?
      new Date(data['Messages'][0].date).toLocaleTimeString() :
      null)

    const upper_text = App.createElement('div', {
      className: 'chat-card--data_upper',
    }, chat_name, chat_date)
    const message_text = App.createElement('span', {
      className: 'chat-card--data_lower__text',
    }, data['Messages'][0] ?
      decryptMessage(
          localStorage.getItem('key'),
          data['Messages'][0].content,
          data['Users'][0].pub_key,
      ).text :
      null)
    const lower_text = App.createElement('div', {
      className: 'chat-card--data_lower',
    }, message_text)
    const data_div = App.createElement('div', {
      className: 'chat-card--data',
    }, upper_text, lower_text)

    const vMain = App.createElement('div',
        {
          className: 'chat-card',
          onclick: (e) => {
            window.history.replaceState({}, '', `#/im/${data.chat_id}`)
            window.dispatchEvent(new Event('hashchange'))
          },
        },
        picture_div, data_div)
    return vMain
  }
}

export {ChatCard}
