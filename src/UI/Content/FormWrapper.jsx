import React from "react";
import { Spin, Form } from "antd";
import SubmitButtons from "./SubmitButtons";
import ApprovalHierarchy from "./ApprovalHierarchy";

export default class FormWrapper extends React.Component {
  render() {
    return (
      <Spin spinning={this.props.loading} size="large" tip="Please wait">
        <Form onSubmit={this.props.formSubmit} id="backupRequest">
          <div className="container  px-5 py-3">
            <div className="row input">
              <div className="container">
                <h3 className="pt-3">{this.props.formTitle}</h3>
              </div>
            </div>
            {this.props.display}
            <ApprovalHierarchy approverData={this.props.approverData} />
          </div>
          <SubmitButtons />
        </Form>
      </Spin>
    );
  }
}
