import React from "react";
import { Spin, Result, Button } from "antd";
import { Link } from "react-router-dom";
import MailApproveDataProvider from "./MailApproveDataprovider";

var response = "";
export default class MailApproveComments extends React.Component {  // class to approve through mail with comments.
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      loading: false,
      comment: ""
    };
    this.mailapprove=this.mailapprove.bind(this);
    this.MailApproveDataProvider=new MailApproveDataProvider();
  }
  async mailapprove(status) {                                             // function to approve through mail with comments.
    this.setState({ loading: true});
    const data = {};
    const params = new URLSearchParams(document.location.search);    // parameters received through url.
    data["comment"] = this.state.comment;
    data["ref_code"] = params.get("ref_code");
    data["status"] = status;
    response = await this.MailApproveDataProvider.approveThroughMail(data);
    this.setState({ loading: response.loading, status: response.status });
  }
  render() {
    if (this.state.status === false) {
      return (
        <Spin
          size="large"
          spinning={this.state.loading}
          tip="Action in progress..."
        >
          <div className="container  ">
            <div className="row input pt-3">
              <div className="col-4 text-right">Enter Comments</div>
              <div className="col-8 text-center">
                <textarea
                  className="form-control"
                  placeholder="Enter comments here"
                  style={{ width: 350 }}
                  onChange={(event) => {
                    this.setState({comment:event.target.value});
                  }}
                />
              </div>
            </div>
            <div className="row input pb-3">
              <div className="col-12 text-center">
                <button
                  className="btn btn-dark"
                  onClick={()=> this.mailapprove(true)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-secondary ml-3"
                  onClick={()=> this.mailapprove(false)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </Spin>
      );
    } else {
      return (                                        // success page
        <Result
          status="success"
          title="Successfully Completed Action !"
          subTitle="Your requested action has been executed, please go to homepage."
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
}
