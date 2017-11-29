import React, { Component } from 'react';

console.log('Rendering <ChatBar/>');

class ChatBar extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };

    this.onContent = this.onContent.bind(this);
    this.onPost = this.onPost.bind(this);
  }
  // receice the text in the input field
  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }
  // if user press enter, passing it up to App
  onPost(event) {
    if (event.key === 'Enter') {
      this.props.onNewMessage(this.state.content);
      this.setState({
        content: ''
      });
    }
  }

  render() {
    const currentUser = this.props.currentUser.name;     
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          defaultValue={ currentUser } />
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER"
          onChange={ this.onContent }
          value={this.state.content}
          onKeyDown= { this.onPost }
          />
      </footer>
    );
  }
}

export default ChatBar;