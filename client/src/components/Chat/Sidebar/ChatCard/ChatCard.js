import {Component} from '../../../../core/Component/Component'
import App from '../../../../core/App'
import {decryptMessage} from '../../../../utils/encryption/decrypt'

class ChatCard extends Component {
  constructor(props) {
    super(props)
  }
  createChat() {
    fetch('https://' + window.location.host + '/api/chat/create', {
      method: 'POST',
      body: JSON.stringify({
        user_id: this.props.user_id,
      }),
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode !== 200) {
            alert(res.message)
          } else {
            window.history.replaceState({}, '', `#/im/${res.chat_id}`)
            window.dispatchEvent(new Event('hashchange'))
            window.dispatchEvent(new Event('hashchange'))
          }
        })
  }
  render() {
    const data = this.props
    const picture_div = App.createElement('div', {
      className: 'chat-card--picture',
    })
    if (data.picture_url.includes('http')) {
      const profile_img = App.createElement('img', {
        src: data.picture_url,
        className: 'chat-card--picture_image',
      })
      picture_div.props.children.push(profile_img)
    } else {
      const profile_text = App.createElement('span', {
        className: 'chat-card--picture_span',
      }, data.username[0].toUpperCase())
      picture_div.props.style = {
        background: data.picture_url,
      }
      picture_div.props.children.push(profile_text)
    }


    const chat_name = App.createElement('span', {
      className: 'chat-card--data_upper__name',
    }, data.username)

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
          data.pub_key,
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
            if (!data.chat_id) {
              this.createChat()
              return
            }
            if (window.location.hash.includes(data.chat_id)) return
            window.history.replaceState({}, '', `#/im/${data.chat_id}`)
            window.dispatchEvent(new Event('hashchange'))
            window.dispatchEvent(new Event('hashchange'))
          },
        },
        picture_div, data_div)
    return vMain
  }
}

export {ChatCard}
