import React from "react";
import { Input,Select } from "antd";

const { Option } = Select;

export default class RiskType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        assetNumber: "",
        riskType:"",
    };
    this.formChange = this.formChange.bind(this);
  }
  componentDidUpdate() {
    this.props.getDataFromRiskType(this.state);
  }
  async formChange(event) {
    // funtion to save changes to form
    // to save data on change
    const target = event.target;
    await this.setState({ [target.name]: target.value });
  }
  render() {
    return (
      <div>
        <div className="row input">
          <div className="col-3">
            <label>Risk type</label>
          </div>
          <div className="col-4 mb-2">
            <Select
              name="riskType"
              placeholder="Select"
              style={{ width: 250 }}
              onChange={(value) => {
                this.setState({ riskType: value });
              }}
            >
              {this.props.riskSelect.map((person) => (
                <Option value={person.id} label={person.name} key={person.name}>
                  {person.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="row">
          <div className="col-3 ">
            <label>Asset no.</label>
          </div>
          <div className="col-4 mb-3">
            <Input
              name="assetNumber"
              style={{ width: 250 }}
              onChange={this.formChange}
              required={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
