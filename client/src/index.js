import './scss/index.scss'
import Cryptash from './components/Cryptash'
import App from '@core/App'

const CryptashComp = App.createElement(Cryptash, {name: 'Hello World'})

App.render(CryptashComp, document.getElementById('app'))
