import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const message = this.props.messages.map(message => {
      return <Message 
        key={ message.id }
        username={ message.username }
        content={ message.content }
        />
    });
    return (
      <main className="messages">
        { message }
        <div className="message system">
          { this.props.notification }
        </div>
      </main>
    );
  }
}
export default MessageList;
