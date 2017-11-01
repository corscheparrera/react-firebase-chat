import React, {Component} from 'react'
import fire from './firebase.js'
const database = fire.database()

class Chat extends Component {

  constructor() {
    super()
    this.state = {
      chat: [],
      users: []
    }

  }

  _handleClick = () => {
    var msgUser = this.userName.value
    var msgText = this.userInput.value
    database
      .ref(`${this.props.path}/messages`)
      .push({username: msgUser, text: msgText})
    this.userInput.value = ""

  }

  componentDidMount() {

    database
      .ref(`${this.props.path}/messages`)
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

  renderMessanges(data, i) {
    return (
      <div key={i}>
        {data.username}: {data.text}
      </div>
    )
  }
  render() {
    return (
      <div className='App'>
        <input
          ref={r => this.userName = r}
          id="username"
          type="text"
          placeholder="Name"/>
        <br/>
        < input ref= { r => this.userInput = r } id="text" type="text" placeholder="Message"/>< br/>
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
export default Chat