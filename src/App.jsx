import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

console.log('Rendering <App/>');

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };

    this.onNewMessage = this.onNewMessage.bind(this);
  }

  // get new message from currentUser
  onNewMessage(content) {
    const messages = this.state.messages;
    const id = messages[messages.length-1].id + 1;
    const newMessage = {
      id: id,
      username: this.state.currentUser.name,
      content: content
    };
    messages.push(newMessage);
    this.setState(messages);
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
