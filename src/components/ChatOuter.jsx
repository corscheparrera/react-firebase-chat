import React, {Component} from 'react'
import Login from './Login.jsx'
import ChatInner from './ChatInner.jsx'
import fire from './Firebase.js'
const database = fire.database()

class ChatOuter extends Component {

  constructor() {
    super()
    this.state = {
      user: '',
      usersStatus: []
    }
  }

  handleUserLogin = (usernameValue) => {
    this.setState({
      user: usernameValue
    }, () => this.pushUsernameFirebase())
  }

  pushUsernameFirebase = () => {

    var ref = database.ref(`/users-${this.props.path}`)

    var pushId = ref
      .push({username: this.state.user, status: 'online'})
      .key

    database
      .ref(`/messages-${this.props.path}`)
      .push({username: this.state.user, text: "I'm online"})

    var disconnectTask = {};
    disconnectTask[pushId] = {
      username: this.state.user,
      status: 'offline'
    }

    ref
      .onDisconnect()
      .update(disconnectTask)

    this.alertUserStatus('child_changed')
  }

  alertUserStatus = (event) => {
    database
      .ref(`/users-${this.props.path}`)
      .on(event, x => this.displayStatus(x.val()))
  }
  displayStatus = (data) => {
    database
      .ref(`/messages-${this.props.path}`)
      .push({username: data.username, text: `I'm ${data.status}`})
  }

  showMyComponent = () => {
    if (!this.state.user) {
      return true
    } else 
      return false
  }

  render() {
    return (
      <div>
        {this.showMyComponent()
          ? <Login updateUsername={this.handleUserLogin}/>
          : <ChatInner user={this.state.user} path={this.props.path}/>}
      </div>
    )
  }
}

export default ChatOuter