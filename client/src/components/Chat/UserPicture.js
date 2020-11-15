import App from '../../core/App'

class UserPicture extends App.Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (!this.props.picture_url) {
      return null
    }
    const picture_div = App.createElement('div', {
      className: 'profile-pic',
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
    return picture_div
  }
}
export {UserPicture}
