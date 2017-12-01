import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: ''
    };

    this.onContent = this.onContent.bind(this);
    this.onPost = this.onPost.bind(this);
    this.onUsername = this.onUsername.bind(this);
    this.onNewUsername = this.onNewUsername.bind(this);
  }
  // receice the text in the input field
  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }
  // receice the username in the input field
  onUsername(event) {
    this.setState({
      username: event.target.value
    });
  }
  // if user press enter, passing new content up to App
  onPost(event) {
    if (event.key === 'Enter') {
      this.props.onNewMessage(this.state.content);
      this.setState({
        content: ''
      });
    }
  }
  // if user leave input field, passing new username up to App
  onNewUsername() {
    const username = this.state.username;
    this.props.onNewUser(username);
  }

  render() {
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          onChange={ this.onUsername }
          value={this.state.username}
          onBlur= { this.onNewUsername } 
          />
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