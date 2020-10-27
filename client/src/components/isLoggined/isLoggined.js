import {Component} from '../../core/Component'

class IsLogginedComponent extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    if (window.localStorage.getItem('token')) {
      const isAuthed = await fetch('http://localhost:9000/api/checkAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          token: window.localStorage.getItem('token'),
        }),
      }).then((res) => res.json()).then((res) => res.statusCode === 200)
      console.log(isAuthed)
    }
  }
  render() {

  }
}
