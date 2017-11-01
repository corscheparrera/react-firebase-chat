import React, {Component} from 'react'
import fire from './Firebase.js'
import Login from './Login.jsx'
const database = fire.database()

class Chat extends Component {

  constructor() {
    super()
    this.state = {
      chat: [],
      user: ''
    }

  }

  _handleClick = () => {
    var msgUser = this.state.user
    var msgText = this.userInput.value
    database
      .ref(`/messages-${this.props.path}`)
      .push({username: msgUser, text: msgText})
    this.userInput.value = ""

  }

  componentDidMount() {
    database
      .ref(`/messages-${this.props.path}`)
      .on('child_added', x => this.updateState(x.val()))
  }

  updateState = (data) => {

    this.setState({
      chat: this
        .state
        .chat
        .concat([data])
    })
  }

  handleUserLogin = (usernameValue) => {
    this.setState({
      user: usernameValue
    }, () => this.pushUsernameFirebase())

  }
  pushUsernameFirebase = () => {

    var ref = database.ref(`/users-${this.props.path}`)
    var disconnectTask = {};
    var pushId = ref
      .push({username: this.state.user, status: 'online'})
      .key
    disconnectTask[pushId] = {
      username: this.state.user,
      status: 'offline'
    };
    ref
      .onDisconnect()
      .update(disconnectTask);

  }
  renderMessanges = (data, i) => {
    return (
      <div key={i}>
        {data.username}: {data.text}
      </div>
    )
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
          : <div className='App'>
            <h3>{this.state.user}</h3>
            <input
              ref=
              { r => this.userInput = r }
              id="text"
              type="text"
              placeholder="Message"/>< br/>
            < br/>
            <button onClick={this._handleClick} id="post">Post</button>
            < br/>
            <br/> {this
              .state
              .chat
              .map(this.renderMessanges)}
          </div>}
      </div>
    )
  }
}

export default Chat