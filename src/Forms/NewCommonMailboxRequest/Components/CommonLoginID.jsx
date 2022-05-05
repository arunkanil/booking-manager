import React from "react";
import { Input, Select, Radio } from "antd";
import { PATTERNS } from "../../../App/Constants";
import CommonMailboxDataProvider from "../CommonMailboxDataProvider";
const { Option } = Select;
export default class CommonLoginID extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiManager: [],
      loginName: "",
      loginEmail: "",
      loginOwner: "",
      requiredLogin:false
    };
    this.formChange = this.formChange.bind(this);
    this.CommonMailboxDataProvider = new CommonMailboxDataProvider();
  }
  componentDidUpdate() {
    this.props.getDataFromCommonLoginID(this.state);
  }
  async formChange(event) {
    // funtion to save changes to form
    // to save data on change
    const target = event.target;
    await this.setState({ [target.name]: target.value });
  }
  async handleSearch(value){
    //api to fill in multiselect people picker
    const response = await this.CommonMailboxDataProvider.handleSearch(value);
    this.setState({ apiManager: response });
  }
  render() {
    return (
      <div className="row input">
        <div className="container pb-3">
          <h4 className="pt-3">Common Login ID</h4>
          <hr />
          <div className="row input">
            <div className="col-4 pl-4">
              <label>Do you require login ID</label>
            </div>
            <div className="col-4 pl-4">
              <Radio.Group name="requiredLogin" defaultValue={false} onChange={this.formChange}>
                <Radio value={true} >
                  Yes
                </Radio>
                <Radio value={false} >
                  No
                </Radio>
              </Radio.Group>
            </div>
          </div>
          {this.state.requiredLogin===true?(
          <div id="section4">
            <div className="row input">
              <div className="col-4 pl-4">
                <label>Login name</label>
              </div>
              <div className="col-2">
                <Input
                  pattern={PATTERNS.LOGIN_NAME}
                  maxLength={15}
                  name="loginName"
                  style={{ width: 250 }}
                  onChange={this.formChange}
                />
              </div>
            </div>
            <div className="row input">
              <div className="col-4 pl-4">
                <label>Login Email ID</label>
              </div>
              <div className="col-3 ">
                <Input
                  name="loginEmail"
                  type="email"
                  pattern={PATTERNS.EMAIL}
                  style={{ width: 250 }}
                  onChange={this.formChange}
                />
              </div>
            </div>
            <div className="row input">
              <div className="col-4 pl-4">
                <label>Select Login Owner</label>
              </div>
              <div className="col-3">
                <Select
                  showSearch
                  name="loginOwner"
                  placeholder="Type to search"
                  style={{ minWidth: 250 }}
                  onSearch={(value) => {
                    this.handleSearch(value);
                  }}
                  onChange={(value, key) => {
                    this.setState({ loginOwner: value });
                  }}
                >
                  {this.state.apiManager.map((person) => (
                    <Option
                      value={person.name}
                      label={person.name}
                      key={person.name}
                    >
                      {person.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
           ):null}
        </div>
      </div>
    );
  }
}
