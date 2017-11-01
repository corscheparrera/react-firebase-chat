import React, {Component} from 'react'
import fire from './Firebase.js'

class Login extends Component {

  _loginClick = () => {
    this
      .props
      .updateUsername(this.userName.value);
  }

  render() {
    return (
      <div>
        <input
          type='text'
          ref={r => this.userName = r}
          placeholder='Enter your username'/>
        <br/>
        <button onClick={this._loginClick}>Chat now</button>
      </div>
    )
  }
}

export default Login
