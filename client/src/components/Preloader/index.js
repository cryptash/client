import App from '@core/App'

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
