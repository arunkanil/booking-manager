import React, { Component } from "react";
import { Button } from "antd";
import { navigateTo } from "./CommonFunctions";

export class LinkRenderer extends Component {
  render() {
    return (
      <>
        <Button
          type="link"
          onClick={() => {
            const url = navigateTo(this.props.data[this.props.request], this.props.value, this.props.type);
            if (url != null) {
              window.location=url;
              // this.props.history.push(url);
            }
          }}
        >
          {this.props.value}
        </Button>
      </>
    );
  }
}
