import React, { Component } from 'react';
import Message from './Message.jsx';

console.log('Rendering <MessageList/>');

class MessageList extends Component {
  render() {
    const message = this.props.messages.map(message => {
      return <Message 
        key={ message.id }
        username={ message.username }
        content={ message.content } />
    });
    return (
      <main className="messages">
        { message }
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
// MessageList.propTypes = {
//   messages: PropTypes.string.isRequired,
// };
export default MessageList;
