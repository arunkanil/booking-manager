import React from "react";
import { Link } from "react-router-dom";
import {Button, Result} from "antd";
import { MESSAGES } from "../../App/Constants";

//common component for success message after form submission
export default class RequestSuccess extends React.Component {
  componentDidMount(){
    window.scroll(0,0);
  }
  render() {
    return (
      <Result
        status="success"
        title={MESSAGES.success}
        subTitle={MESSAGES.successDetail}
        extra={[
          <Link to="/">
            <Button type="primary" key="console">
              Go to Home
            </Button>
          </Link>
        ]}
      />
    );
  }
}