import {Component} from '../../core/Component/Component'
import App from '../../core/App'
import {Sidebar} from './Sidebar/Sidebar'
import './index.scss'
import {DialogRouter} from './Dialog/DialogRouter'
import {Preloader} from '../Preloader'
// import {Dialog} from './Dialog/Dialog'
// import {DialogRouter} from './Dialog/DialogRouter'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem('token') || this.props.token,
      username: '',
      user_id: '',
      picture_url: '',
      chats: [],
      ready: false,
      socket: new WebSocket('wss://' + window.location.host),
    }
  }
  bindSocket() {
    this.state.socket.onopen = () => {
      this.state.socket.send(
          JSON.stringify({action: 'register', jwt: this.state.token})
      )
    }
    this.state.socket.addEventListener('message', (event) => {
      const response = JSON.parse(event.data)
      // console.dir(response)
      if (!response.data) {
        return
      }
      if (response.data.message === 'Successful connection') {
        console.warn(`Socket: Successful connection`)
      }
      if (response.action === 'new_message') {
        this.fetchData()
      }
    })
  }
  fetchData() {
    fetch('https://' + window.location.host + '/api/users/getInfo', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Authorization': this.state.token,
        'Content-Type': 'application/json',
      },
    })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) {
            console.error(res)
          } else {
            this.setState({...res.response, ready: true})
            // console.log(this.state)
          }
        })
  }
  componentDidMount() {
    this.bindSocket()
    this.fetchData()
  }

  render() {
    if (!this.state.ready) {
      return App.createElement(Preloader)
    }
    const vSidebar = App.createElement(Sidebar, {
      ...this.state,
    })
    // if (!window.location.hash.includes('/im/')) {
    //   return App.createElement('div',
    //       {
    //         className: 'chat',
    //       }, vSidebar)
    // }
    const vMain = App.createElement('div',
        {
          className: 'chat',
        }, vSidebar, App.createElement(DialogRouter,
            {
              socket: this.state.socket,
              chats: this.state.chats,
              picture_url: this.state.picture_url,
              username: this.state.username,
            }))
    return vMain
  }
}
export {Home}
