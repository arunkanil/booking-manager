import React from "react";
import { Radio } from "antd";

export default class RequirementType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirementType: "",
      backupType: ""
    };
    this.formChange = this.formChange.bind(this); //intialize methods
  }
  componentDidUpdate() {
    this.props.getDataFromRequirementType(this.state);
  }
  async formChange(event) {
    //to save changes to form
    const target = event.target;
    await this.setState({ [target.name]: target.value });
  }
  render() {
    return (
      <div className="row input">
        <div className="container pb-3">
          <h4 className="pt-3">Requirement Type</h4>
          <hr />
          <div className="row input">
            <div className="col-2 pl-4">
              <label>Requirement</label>
            </div>
            <div className="col-10 pl-5">
              <Radio.Group
                name="requirementType"
                className="form-check-input"
                onChange={this.formChange}
              >
                <Radio value={"New"} className="mr-4">
                  New
                </Radio>
                <Radio value={"Modification"} className="ml-5">
                  Modification
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="row ">
            <div className="col-2 pl-4">
              <label>Backup type</label>
            </div>
            <div className="col-10 pl-5">
              <Radio.Group
                name="backupType"
                className="form-check-input"
                onChange={this.formChange}
              >
                <Radio value={"User mail data"}>User mail data</Radio>
                <Radio
                  value={"SQL DB/Oracle DB/Image backup/Other"}
                  className="pl-1"
                >
                  SQL DB/Oracle DB/Image backup/Other
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
