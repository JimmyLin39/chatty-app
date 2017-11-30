import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// var exampleSocket = new WebSocket('ws://localhost:3001/', 'ws');

console.log('Rendering <App/>');

class App extends Component {
  constructor() {
    super();

    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      // messages coming from the server
      messages: []
    };

    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }
  
  componentDidMount() {
    this.socket.addEventListener('message', (msg) => {
      console.log(msg.data);
      this.setState({messages: this.state.messages.concat(JSON.parse(msg.data))});
      console.log('messages', this.state.messages);
    });
  }

  // get current username from ChatBar
  onNewUser(username) {
    console.log('current username', this.state.currentUser.name);
    console.log('new username', username);
    const currentUser = this.state.currentUser.name;
    const postNotification = {
      type: 'postNotification', 
      content: `${currentUser}has changed their name to ${username}.`
    }
    this.socket.send(JSON.stringify(postNotification));
    this.setState({
      currentUser: {
        name: username || 'Anonymous'
      }
    }); 
  }

  // get new message from ChatBar
  onNewMessage(content) {
    const { currentUser } = this.state;
    console.log('content:', content);
    const newMessage = {
      'type': 'postMessage',
      username: currentUser.name,
      content: content
    };

    this.socket.send(JSON.stringify(newMessage));
  }

  // render the page
  render() {
    return (
      <div>  
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={ this.state.messages } />
        <ChatBar 
          onNewUser={ this.onNewUser }
          onNewMessage={ this.onNewMessage } 
          />
      </div>
    )   
  }
}
export default App;
