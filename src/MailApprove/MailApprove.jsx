import React from "react";
import { Spin, Result,Button } from "antd";
import { Link } from "react-router-dom";
import MailApproveDataProvider from "./MailApproveDataprovider";

var response = "";
export default class MailApprove extends React.Component {
    async componentDidMount(){
        const data = {};
        const params = new URLSearchParams(document.location.search);  // parameters received through url
        data["comment"] = this.state.comment;
        data["ref_code"] = params.get("ref_code");
        data["status"] = params.get("status");
        response = await this.MailApproveDataProvider.approveThroughMail(data);//function to approve through mail. 
        this.setState({ loading: response.loading,status: response.status });
    }
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      loading: true,
      comment:""
    };
    this.MailApproveDataProvider=new MailApproveDataProvider();
  }
  render() {
    if (this.state.status === false) {
      return (
        <Spin
          size="large"
          spinning={this.state.loading}
          tip="Action in progress..."
        ></Spin>
      );
    } else {
      return (
        <Result                                                 //success page
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