import App from '@core/App'
import './index.scss'
class Preloader extends App.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return App.createElement('div', {className: 'lds-roller'},
        App.createElement('div', {}),
        App.createElement('div', {}),
        App.createElement('div', {}),
        App.createElement('div', {}),
        App.createElement('div', {}),
        App.createElement('div', {}),
        App.createElement('div', {}),
        App.createElement('div', {}),
    )
  }
}

export {Preloader}
