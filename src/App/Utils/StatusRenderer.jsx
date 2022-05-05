import React, { Component } from "react";
import { Tag } from "antd";

let color = "geekblue";
export class StatusRenderer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { value: "status" };
  // }
  colorSelect = value => {
    if (value == "rejected") {
      color = "volcano";
    }
    if (value == "approved") {
      color = "green";
    }
    if (value == "pending") {
      color = "geekblue";
    }
    return (
      <Tag color={color}>{this.props.value}</Tag>
    )
  };
  render() {
    return (
      <>
        {this.props.value == "0" ? (
          <Tag color="geekblue">Pending</Tag>
        ) : this.props.value == "1" ? (
          <Tag color="green">Approved</Tag>
        ) : this.props.value == "-1" ? (
          <Tag color="volcano">Rejected</Tag>
        ) : this.colorSelect(this.props.value)}
      </>
    );
  }
}
