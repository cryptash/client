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
    fetch('http://localhost:9000/api/users/search', {
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
            this.setState({
              users: res.data.users,
            })
            console.log(this.state.users)
          }
        })
  }
  render() {
    const input = App.createElement('input', {
      className: 'sidebar-search--input',
      oninput: (e) => {
        this.handleSearch(e)
      },
    })
    return App.createElement('div', {
      className: 'sidebar-search',
    }, input)
  }
}
export {SidebarSearch}
