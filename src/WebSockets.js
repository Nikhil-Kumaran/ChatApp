import React from "react";
import MessageWindow from "./MessageWindow";
import UserModal from "./UserModal";

export default class Websockets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      messages: [],
    };

    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    this.createWebSocket();
  }

  componentDidUpdate() {
    if (!this.ws) {
      return;
    }

    if (this.ws.readyState === this.ws.CLOSED) {
      this.createWebSocket();
    }
  }

  componentWillUnmount() {
    if (!this.ws) {
      return;
    }
    this.ws.close();
    clearInterval(this.timer);
  }

  onOpen(e) {
    try {
      this.ws.send("ping");
    } catch (err) {
      console.log("Got invalid message from websocket on open", err, e.data);
    }
  }

  onMessage(e) {
    try {
      if (e.data !== "pong") {
        const data = JSON.parse(e.data);
        this.setState({ messages: [...this.state.messages, data] });
      } else {
        console.log(e.data);
      }
    } catch (err) {
      console.log("Got invalid message from websocket on message", err, e.data);
    }
  }

  onClose(e) {
    if (!e.wasClean) {
      console.log({ error: `WebSocket error: ${e.code} ${e.reason}` });
      this.createWebSocket();
    }
  }

  onError(e) {
    console.log("received websocket error", e);
  }

  createWebSocket() {
    // use ws for http(localhost) and wss for https
    this.ws = new WebSocket("wss://chat-server-ws.herokuapp.com");

    this.ws.onmessage = e => this.onMessage(e);
    this.ws.onerror = e => this.onError(e);
    this.ws.onclose = e => this.onClose(e);
    this.ws.onopen = e => this.onOpen(e);
  }

  handleClick(text) {
    this.ws.send(
      JSON.stringify({
        client: this.state.client,
        message: text,
      }),
    );
  }

  getName(name) {
    this.setState({ client: name });
  }

  render() {
    const { client, messages } = this.state;
    return (
      <>
        <UserModal isOpen={true} getName={this.getName} />
        <MessageWindow messages={messages} handleClick={this.handleClick} client={client} />
      </>
    );
  }
}
