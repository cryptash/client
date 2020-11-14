import App from '../../../core/App'
import {Route} from '../../../core/Router/Route'
import {Dialog} from './Dialog'

class DialogRouter extends App.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: '',
    }
  }
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.updateComponent()
    })
  }

  render() {
    const vMain = App.createElement('div', {className: 'dialog'},
        App.createElement(Route, {
          render: (match) => {
            return App.createElement(Dialog, {
              ...match,
              ...this.props,
            })
          },
          path: '#/im/:id',
          exact: false,
        })
    )
    return vMain
  }
}
export {DialogRouter}

