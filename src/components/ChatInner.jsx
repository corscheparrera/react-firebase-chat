import React, {Component} from 'react'
import fire from './Firebase.js'
import Login from './Login.jsx'
const database = fire.database()

class ChatInner extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chat: [],
      user: this.props.user
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

  renderMessanges = (data, i) => {
    return (
      <div key={i}>
        {data.username}: {data.text}
      </div>
    )
  }

  render() {
    return (
      <div className='App'>
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
      </div>

    )
  }
}

export default ChatInner