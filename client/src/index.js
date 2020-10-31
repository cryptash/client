import './scss/index.scss'
import Cryptash from './components/Cryptash'
import App from '@core/App'

const cryptash = App.createElement(Cryptash, {name: 'Hello World'})

App.render(cryptash, document.getElementById('app'))
