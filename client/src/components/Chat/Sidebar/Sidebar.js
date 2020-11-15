import App from '@core/App'
import {ChatCard} from './ChatCard/ChatCard'
import './Sidebar.scss'
import {SidebarHeader} from './SidebarHeader'
import {SidebarSearch} from './SidebarSearch'

export class Sidebar extends App.Component {
  constructor(props) {
    super(props)
    this.state = {
      chats: this.props.chats,
      query: '',
    }
  }
  setChats(newChats) {
    console.log(newChats)
    this.setState({
      chats: [...this.state.chats, ...newChats],
    })
  }
  componentDidMount() {}
  render() {
    // console.log(this.props)
    const chat_cards = []
    this.props.chats.sort((a, b) => {
      return new Date(b.messageAt) - new Date(a.messageAt)
    })
    this.state.chats.forEach((data) => {
      if (this.state.query === '' ||
      data['Users'][0]['username'].includes(this.state.query) ||
      data['Users'][1]['username'].includes(this.state.query)
      ) {
        console.log(data)
        chat_cards.push(App.createElement(ChatCard, {
          'username': !data['Users'] ?
            data.username :
            data['Users'][0].username,
          // eslint-disable-next-line max-len
          'picture_url': !data['Users'] ? data.picture_url : data['Users'][0].picture_url,
          'user_id': data.user_id ? data.user_id : '',
          'chat_id': data.chat_id ? data.chat_id : '',
          'Messages': data['Messages'] ? data['Messages'] : [],
          'pub_key': !data['Users'] ? '' : data['Users'][0].pub_key,
        }))
      }
    })
    const vMain = App.createElement('div', {
      className: 'sidebar',
    }, App.createElement(SidebarHeader, {
      picture_url: this.props.picture_url,
      username: this.props.username,
    }),
    App.createElement(SidebarSearch, {
      setChats: (newChats) => this.setChats(newChats),
    }),
    ...chat_cards,
    )
    return vMain
  }
}
