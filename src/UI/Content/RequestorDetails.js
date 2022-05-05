import React from "react";
var tempDate = new Date();
//common component that is shown in all request Forms used to show requestor details.
export default class RequestorDetails extends React.Component {
  async componentDidMount() {
    await this.setState({ userDetails: localStorage.getItem("user_details") });
  }
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      requestdate:
        tempDate.getDate() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-" +
        tempDate.getFullYear(),
      requestorname: localStorage.getItem("name"),
      sap: localStorage.getItem("sap_code"),
      vertical: localStorage.getItem("vertical"),
      department: localStorage.getItem("department"),
      company: localStorage.getItem("company"),
      designation: localStorage.getItem("designation"),
      email: localStorage.getItem("email_id"),
      mobilenum: localStorage.getItem("mobile_no"),
      extension: localStorage.getItem("extension_no"),
      location: localStorage.getItem("location")
    };
  }
  render() {
    return (
      <div>
        <div className="row input">
          <div className="container ">
            <h4 className="pt-3">User details</h4>
            <hr />
            <div className="background py-2 pl-2">
              <div className="row input">
                <div className="col-2 pl-4 ">Request Date</div>
                <div className="col-4 pl-4">
                  <b>
                    <label>{this.state.requestdate}</label>
                  </b>
                </div>
              </div>
              <div className="row input">
                <div className="col-2 pl-4">Requestor Name</div>
                <div className="col-4 pl-4">
                  <b>
                    <label>{this.state.requestorname}</label>
                  </b>
                </div>
                <div className="col-2 ">SAP Code</div>
                <div className="col-4 ">
                  <b>
                    <label>{this.state.sap}</label>
                  </b>
                </div>
              </div>
              <div className="row input">
                <div className="col-2 pl-4">Company Name</div>
                <div className="col-4 pl-4">
                  <b>
                    <label>{this.state.company}</label>
                  </b>
                </div>
                <div className="col-2 ">Vertical</div>
                <div className="col-4 ">
                  <b>
                    <label>{this.state.vertical}</label>
                  </b>
                </div>
              </div>
              <div className="row input">
                <div className="col-2 pl-4">Department</div>
                <div className="col-4 pl-4">
                  <b>
                    <label>{this.state.department}</label>
                  </b>
                </div>
                <div className="col-2 ">Location</div>
                <div className="col-4 ">
                  <b>
                    <label>{this.state.location}</label>
                  </b>
                </div>
              </div>
              <div className="row input">
                <div className="col-2 pl-4">Designation</div>
                <div className="col-4 pl-4">
                  <b>
                    <label>{this.state.designation}</label>
                  </b>
                </div>
                <div className="col-2 ">E-mail ID</div>
                <div className="col-4 ">
                  <b>
                    <label>{this.state.email}</label>
                  </b>
                </div>
              </div>
              <div className="row input">
                <div className="col-2 pl-4">Mobile No.</div>
                <div className="col-4 pl-4">
                  <b>
                    <label>{this.state.mobilenum}</label>
                  </b>
                </div>
                <div className="col-2 ">Extension No.</div>
                <div className="col-4 ">
                  <b>
                    <label>
                      {this.state.extension === "null"
                        ? "------"
                        : this.state.extension}
                    </label>
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
