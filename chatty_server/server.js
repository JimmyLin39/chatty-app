// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });
let numberOfClient = 0;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  numberOfClient += 1;
  console.log('numberOfClient:', numberOfClient);
  userOnlineMsg(numberOfClient);

  // receive message from client
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    const parsedMessage = JSON.parse(message);
    switch(parsedMessage.type) {
      case 'postMessage':
        // handle post message
        postMessage(parsedMessage);
        break;
      case 'postNotification':
        // handle post notification
        console.log('post notifictaion');
        postNotification(parsedMessage);
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error('Unknown event type ' + parsedMessage.type);
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    numberOfClient -= 1;
    console.log('numberOfClient:', numberOfClient);
    userOnlineMsg(numberOfClient);
  });
});

wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

// handle post message
function postMessage(message) {
  // create a unique timestamp uuid
  const id = uuidv1();
  // add id and type to message
  message['id']= id;
  message['type']= 'incomingMessage';
  // broadcast message to all clients
  console.log('broadcast data', message);
  wss.broadcast(message);
}

// handle post notification
function postNotification(message) {
  message.type = 'incomingNotification';
  wss.broadcast(message);
}

// send back a message when a user connect or disconnect
function userOnlineMsg(numberOfClient) {
  const userOnlineMsg = {
    type: 'incomingUserOnlineMsg',
    content: `${numberOfClient} users online`
  }
  wss.broadcast(userOnlineMsg);
}
