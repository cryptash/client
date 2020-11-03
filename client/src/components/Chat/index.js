import {Component} from '../../core/Component/Component'
import App from '../../core/App'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem('token') || this.props.token,
      username: '',
      user_id: '',
      picture_url: '',
      chats: [],
      socket: new WebSocket('ws://localhost:9000'),
    }
  }
  bindSocket() {
    this.state.socket.onopen = () => {
      this.state.socket.send(
          JSON.stringify({action: 'register', jwt: this.state.token})
      )
    }
    this.state.socket.onmessage = function(event) {
      const response = JSON.parse(event.data)
      console.dir(response)
      if (response.data.message === 'Successful connection') {
        console.warn(`Socket: Successful connection`)
      }
    }
  }
  componentDidMount() {
    this.bindSocket()
    fetch('http://localhost:9000/api/users/getInfo', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.login,
        password: this.state.password,
      }),
      headers: {
        'Authorization': this.state.token,
        'Content-Type': 'application/json',
      },
    })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          if (res.statusCode !== 200) {
            alert(res.message)
          } else {
            this.setState({...res.response})
            console.log(this.state)
          }
        })
  }

  render() {
    const vMain = App.createElement('div',
        {
          className: 'chat',
        })
    return vMain
  }
}
export {Home}
