import {Component} from '../Component/Component'
import {matchPath} from './matchPath'
import App from '@core/App'

class Route extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.updateComponent()
    })
  }
  render() {
    const {
      component,
      props,
      render,
    } = this.props
    const match = matchPath(window.location.hash, this.props)
    if (!match) {
      return null
    }
    if (render) {
      return render({...match, ...props})
    }
    if (component) {
      return App.createElement(component, {...match, ...props})
    } else {
      return null
    }
  }
}

export {Route}
