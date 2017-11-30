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
      // optional. if currentUser is not defined, it means the user is Anonymous
      currentUser: {name: 'Anonymous'}, 
      // messages coming from the server
      messages: [],
      notification: ''
    };

    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }
  
  componentDidMount() {
    // listening to incoming message from server
    this.socket.addEventListener('message', (msg) => {
      console.log(msg.data);
      const parsedMsg = JSON.parse(msg.data);
      switch(parsedMsg.type) {
        case 'incomingMessage':
          // handle incoming message
          this.setState({messages: this.state.messages.concat(parsedMsg)});          
          break;
        case 'incomingNotification':
          // handle incoming notification
          console.log(parsedMsg.content);
          this.setState({notification: parsedMsg.content});
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + parsedMsg.type);
      }

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
      content: `${currentUser} has changed their name to ${username || 'Anonymous'}.`
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
        <MessageList 
          messages={ this.state.messages } 
          notification={ this.state.notification }/>
        <ChatBar 
          onNewUser={ this.onNewUser }
          onNewMessage={ this.onNewMessage } 
          />
      </div>
    )   
  }
}
export default App;
