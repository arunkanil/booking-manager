import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

export default class Remarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remarks: ""
    };
    this.formChange = this.formChange.bind(this);
  }
  componentDidUpdate() {
    this.props.getDataFromRemarks(this.state);
  }
  async formChange(event) {
    // funtion to save changes to form
    // to save data on change
    const target = event.target;
    await this.setState({ [target.name]: target.value });
  }
  render() {
    return (
      <div className="row ">
        <div className="container">
          <h4 className="pt-3">Remarks</h4>
          <hr />
          <div className="row input">
            <div className="col-2 pl-4 pt-4 ">
              <label>Remarks</label>
            </div>
            <div className="col-8 ">
              <TextArea
                required={true}
                className="form-control"
                rows="3"
                placeholder="maximum 250 characters"
                maxLength="250"
                name="remarks"
                onChange={this.formChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
