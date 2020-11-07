import App from '../../../core/App'
import {Route} from '../../../core/Router/Router'
import {Dialog} from './Dialog'

class DialogRouter extends App.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    window.addEventListener('popstate', () => {
      console.log('render')
      this.updateComponent()
    })
  }

  render() {
    console.log('render')
    const vMain = App.createElement('div', {className: 'dialog'},
        App.createElement(Route, {
          path: '#/im/:username',
          exact: false,
          props: {
            socket: this.props.socket,
            chats: this.props.chats,
          },
          component: Dialog,
        })
    )
    return vMain
  }
}
export {DialogRouter}

