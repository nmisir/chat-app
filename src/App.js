import React, { Component } from 'react';
import './App.css';
import Messages from "./components/Messages";
import Input from "./components/Input";
import compadre from 'compadre';

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const nameGenerator = new compadre();
const name = nameGenerator.generate().toUpperCase();

class App extends Component {
  state = {
    messages: [],
    member: {
      username: name,
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("FmZnWiLYkBFsYqWY", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const date = Date.now();
      const messages = this.state.messages;
      messages.push({member, text: data, timestamp: date});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;