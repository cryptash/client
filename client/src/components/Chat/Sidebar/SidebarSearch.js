import App from '../../../core/App'

class SidebarSearch extends App.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }
  handleSearch(e) {
    if (e.target.value.length < 3) return
    console.log(e.target.value)
    fetch('https://' + window.location.host + '/api/users/search', {
      method: 'POST',
      body: JSON.stringify({
        query: e.target.value,
      }),
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          if (res.statusCode !== 200) {
            alert(res.message)
          } else {
            this.props.setChats(res.data.users)
            console.log(this.state.users)
          }
        })
  }
  render() {
    const icon = App.createElement('span', {
      className: 'material-icons-outlined',
    }, 'search')
    const input = App.createElement('input', {
      className: 'sidebar-search--input---text',
      oninput: (e) => {
        this.handleSearch(e)
      },
      placeholder: 'Search',
    })
    const inputDiv = App.createElement('div', {
      className: 'sidebar-search--input',
    }, icon, input)
    return App.createElement('div', {
      className: 'sidebar-search',
    }, inputDiv)
  }
}
export {SidebarSearch}
