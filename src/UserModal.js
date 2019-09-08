import React from "react";
import { Modal, Input } from "antd";

export default class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: this.props.isOpen, name: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter() {
    this.handleOk();
  }

  handleOk() {
    this.props.getName(this.state.name);
    this.setState({
      visible: false,
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div>
        <Modal
          title="Register"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            autoFocus
            onChange={this.handleChange}
            onPressEnter={this.handleEnter}
            placeholder="Enter your name"
          />
        </Modal>
      </div>
    );
  }
}
