import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// var exampleSocket = new WebSocket('ws://localhost:3001/', 'ws');

console.log('Rendering <App/>');

class App extends Component {
  constructor() {
    super();

    this.socket = null;
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      // messages coming from the server
      messages: []
    };

    this.onNewMessage = this.onNewMessage.bind(this);
  }
  
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    
    // this.socket.addEventListener('open', () => {
    //   this.socket.send('hello');
    // });

    this.socket.addEventListener('message', (msg) => {
      console.log(msg.data);
      this.setState({messages: this.state.messages.concat(JSON.parse(msg.data))});
      console.log('messages', this.state.messages);
    });
  }

  // get new message from currentUser
  onNewMessage(content) {
    const messages = this.state.messages;
    const newMessage = {
      username: this.state.currentUser.name,
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
          currentUser={ this.state.currentUser }
          onNewMessage={ this.onNewMessage } 
          />
      </div>
    )   
  }
}
export default App;
