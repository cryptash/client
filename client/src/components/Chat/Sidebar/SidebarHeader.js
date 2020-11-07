import {Component} from '../../../core/Component/Component'
import App from '../../../core/App'

class SidebarHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    const picture_div = App.createElement('div', {
      className: 'sidebar-header--picture',
    })
    if (this.props.picture_url.includes('http')) {
      const profile_img = App.createElement('img', {
        src: this.props.picture_url,
        className: 'sidebar-header--picture_image',
      })
      picture_div.props.children.push(profile_img)
    } else {
      const profile_text = App.createElement('span', {
        className: 'sidebar-header--picture_span',
      }, this.props.username[0].toUpperCase())
      picture_div.props.style = {
        background: this.props.picture_url,
      }
      picture_div.props.children.push(profile_text)
    }
    const vMain = App.createElement('header', {
      className: 'sidebar-header',
    }, picture_div,
    )
    return vMain
  }
}
export {SidebarHeader}
