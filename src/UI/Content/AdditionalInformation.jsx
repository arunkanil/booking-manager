import React from "react";
import { Input, Select } from "antd";
import { IM_PLACEHOLDER, PATTERNS } from "../../App/Constants";

const { Option } = Select;
const { TextArea } = Input;
export default class AdditionalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: "",
      location: "",
      department: "",
      im_no:""
    };
    this.formChange = this.formChange.bind(this);
  }
  componentDidUpdate() {
    this.props.getDataFromAdditionalInfo(this.state);
  }
  async formChange(event) {
    // funtion to save changes to form
    // to save data on change
    const target = event.target;
    await this.setState({ [target.name]: target.value });
  }
  render() {
    return (
      <div className="row">
        <div className="container pb-3">
          <h4 className="pt-3">Additional Information</h4>
          <hr />
          <div className="row input">
            <div className="col-3 pl-4 pt-3">
              <label>{this.props.textareaLabel}</label>
            </div>
            <div className="col-8 ">
              <TextArea
                className="form-control"
                rows="3"
                placeholder="Maximum 250 characters"
                maxLength="250"
                name="purpose"
                onChange={this.formChange}
              />
            </div>
          </div>
          {this.props.requireIM === true ? (
            <div className="row input">
              <div className="col-3 pl-4">
                <label>IM no.</label>
              </div>
              <div className="col-4">
                <Input
                  name="im_no"
                  style={{ width: 250 }}
                  onChange={this.formChange}
                  maxLength={12}
                  pattern={PATTERNS.IM}
                  placeholder={IM_PLACEHOLDER}
                  required={true}
                />
              </div>
            </div>
          ) : null}
          <div className="row input">
            <div className="col-3 pl-4">
              <label>Department</label>
            </div>
            <div className="col-2">
              <Select
                placeholder="Select"
                name="department"
                style={{ width: 250 }}
                onChange={(value) => {
                  this.setState({ department: value });
                }}
              >
                {this.props.dept.map((dept) => (
                  <Option value={dept.id} label={dept.name} key={dept.name}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="row input">
            <div className="col-3 pl-4">
              <label>Location</label>
            </div>
            <div className="col-3 ">
              <Select
                placeholder="Select"
                name="location"
                style={{ width: 250 }}
                onChange={(value) => {
                  this.setState({ location: value });
                }}
              >
                {this.props.locationList.map((dept) => (
                  <Option value={dept.id} label={dept.name} key={dept.name}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
