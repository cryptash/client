import App from '@core/App'
import {ChatCard} from './ChatCard/ChatCard'
import './Sidebar.scss'
import {SidebarHeader} from './SidebarHeader'

export class Sidebar extends App.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  render() {
    console.log(this.props)
    const chat_cards = []
    this.props.chats.forEach((data) => chat_cards.push(
        App.createElement(ChatCard, {data})
    ))
    const vMain = App.createElement('div', {
      className: 'sidebar',
    }, App.createElement(SidebarHeader, {
      picture_url: this.props.picture_url,
      username: this.props.username,
    }),
    ...chat_cards,
    )
    return vMain
  }
}
