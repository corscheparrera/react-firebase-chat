import Firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCFmfFJVNX_OUpV-O6difxc-1PoZ_QrYDc',
  authDomain: 'fir-chat-9f587.firebaseapp.com',
  databaseURL: 'https://fir-chat-9f587.firebaseio.com',
  projectId: 'fir-chat-9f587',
  storageBucket: 'fir-chat-9f587.appspot.com',
  messagingSenderId: '905682083096'
}

var fire = Firebase.initializeApp(config)

export default fire
