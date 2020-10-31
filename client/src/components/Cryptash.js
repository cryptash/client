import App from '@core/App'
import {Preloader} from './Preloader'

class Cryptash extends App.Component {
  constructor(props) {
    super(props)
    this.state = {
      jokes: [],
    }
  }
  getJokesToState() {
    fetch('https://official-joke-api.appspot.com/random_ten')
        .then((res) => res.json())
        .then((res) => this.setState({jokes: res}))
  }
  componentDidMount() {
    this.getJokesToState()
  }

  render() {
    const mainDiv = App.createElement('div', {className: 'main-div'})
    if (!this.state.jokes[0]) {
      mainDiv.props.children.push(App.createElement(Preloader, {}))
    }
    if (this.state.jokes[0]) {
      const updateButton = App.createElement('button', {
        onclick: () => this.getJokesToState(),
      }, 'New Jokes')
      mainDiv.props.children.push(updateButton)
      this.state.jokes.forEach((e) => mainDiv.props.children.push(
          App.createElement('h1', {}, e.setup),
          App.createElement('h2', {}, e.punchline),
          App.createElement('br', {})
      ))
    }
    return mainDiv
  }
}
export default Cryptash
