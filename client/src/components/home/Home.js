import {LoginComponent} from '../login/login'
import {DomListener} from '../../core/DomListener'

export class HomeComponent extends DomListener {
  constructor(props) {
    super()
    this.isAuthed = props.isAuthed
  }
  toHTML() {
    if (this.isAuthed) {
      return 'AUTHED'
    } else {
      const _ = new LoginComponent()
      return _.toSingleNode()
    }
  }
}
