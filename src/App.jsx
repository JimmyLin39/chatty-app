import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

console.log("Rendering <App/>");

class App extends Component {
  render() {
    return (
      <div>  
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList />
      </div>
    )   
  }
}
export default App;
