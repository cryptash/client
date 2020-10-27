import './scss/index.scss'
import { Cryptash } from './components/cryptash/Cryptash'
import {LoginComponent} from './components/login/login'

const app = new Cryptash('#app', {
  components: [LoginComponent],
})
app.render()
