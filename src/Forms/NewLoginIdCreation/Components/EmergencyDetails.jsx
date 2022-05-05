import React from "react";
import { Input } from "antd";
import { PHONE_MAXLENGTH, PATTERNS } from "../../../App/Constants";
export default class EmergencyContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emergencyContactName: "",
      relationship: "",
      emergencyContactNo: ""
    };
    this.formChange = this.formChange.bind(this);
  }
  componentDidUpdate() {
    this.props.getDataFromEMContactDetails(this.state);
  }
  async formChange(event) {
    // funtion to save changes to form
    // to save data on change
    const target = event.target;
    await this.setState({ [target.name]: target.value });
  }
  render() {
    return (
      <div className="row input">
        <div className="container">
          <h4 className=" pt-3">Emergency Contact details</h4>
          <hr />
          <div className="row input">
            <div className="col-2 ">Name</div>
            <div className="col-4 ">
              <Input
                name="emergencyContactName"
                onChange={this.formChange}
                required={true}
              />
            </div>
            <div className="col-2 ">Relationship</div>
            <div className="col-4 ">
              <Input
                name="relationship"
                required={true}
                onChange={this.formChange}
              />
            </div>
          </div>
          <div className="row input">
            <div className="col-2 ">Contact number</div>
            <div className="col-4 ">
              <Input
                required={true}
                type="text"
                maxLength={PHONE_MAXLENGTH}
                pattern={PATTERNS.PHONE}
                placeholder="10 digit phone number"
                name="emergencyContactNo"
                onChange={this.formChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
