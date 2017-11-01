import React, {Component} from 'react'
import Chat from './Chat.jsx'
import './App.css'

class App extends Component {
  render () {
    return (
      <div>
        <h1>Chat Room 1</h1>
        <Chat path={'/chat1'} />
        <h1>Chat Room 2</h1>
        <Chat path={'/chat2'} />
      </div>
    )
  }
}
export default App
