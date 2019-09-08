import React from "react";
import { Button, Input, Card } from "antd";

class MessageWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };

    this.inputRef = React.createRef();
    this.messageRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidUpdate() {
    this.inputRef.current.focus();

    this.messageRef.current &&
      this.messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  handleClick() {
    this.props.handleClick(this.state.text);
    this.setState({ text: "" });
  }

  handleEnter() {
    this.handleClick();
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    const { client, messages } = this.props;
    return (
      <div id="message-window">
        <h1 id="client-name">{client}</h1>
        <Card id="message-box">
          {messages.map((message, index) => {
            if (message.client === "You")
              return (
                <div
                  ref={this.messageRef}
                  key={index}
                  className="message"
                  style={{
                    left: "100%",
                    transform: "translateX(-100%)",
                  }}
                >
                  <span>You</span>
                  {message.message}
                </div>
              );
            else
              return (
                <div key={index} className="message">
                  <span>{message.client}</span>
                  {message.message}
                </div>
              );
          })}
        </Card>
        <div id="inputs">
          <Input
            ref={this.inputRef}
            onChange={this.handleChange}
            onPressEnter={this.handleEnter}
            value={this.state.text}
          />
          <Button onClick={this.handleClick}>SEND</Button>
        </div>
      </div>
    );
  }
}

export default MessageWindow;
