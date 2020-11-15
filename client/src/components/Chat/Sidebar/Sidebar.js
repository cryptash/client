import App from '@core/App'
import {ChatCard} from './ChatCard/ChatCard'
import './Sidebar.scss'
import {SidebarHeader} from './SidebarHeader'
import {SidebarSearch} from './SidebarSearch'

export class Sidebar extends App.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  render() {
    // console.log(this.props)
    const chat_cards = []
    this.props.chats.sort((a, b) => {
      return new Date(b.messageAt) - new Date(a.messageAt)
    })
    this.props.chats.forEach((data) => chat_cards.push(
        App.createElement(ChatCard, {data})
    ))
    const vMain = App.createElement('div', {
      className: 'sidebar',
    }, App.createElement(SidebarHeader, {
      picture_url: this.props.picture_url,
      username: this.props.username,
    }),
    App.createElement(SidebarSearch, {}),
    ...chat_cards,
    )
    return vMain
  }
}
