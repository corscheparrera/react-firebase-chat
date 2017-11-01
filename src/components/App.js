import React, {Component} from 'react'
import ChatOuter from './ChatOuter.jsx'

class App extends Component {
  render () {
    return (
      <div>
        <h1>Chat Room 1</h1>
        <ChatOuter path={'chat1'} />
        <h1>Chat Room 2</h1>
        <ChatOuter path={'chat2'} />
      </div>
    )
  }
}
export default App
