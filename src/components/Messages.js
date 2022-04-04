import {Component} from "react";
import React from "react";
import moment from "moment";


class Messages extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";

    let time = (timestamp) => {
      let tmstp = moment(timestamp);
      return tmstp.format('DD.MM HH:mm');
    };
    
    return (
      <li className={className} key={Math.random() + 1}>
      <span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      />
        <div className="Message-content">
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
          <div className="timestamp">{time(message.timestamp)}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
