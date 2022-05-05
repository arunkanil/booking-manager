import React from "react";
import { Input, Select, Radio } from "antd";
import { DROPDOWN, PATTERNS } from "../../../App/Constants";
import CommonMailboxDataProvider from "../CommonMailboxDataProvider";
const { Option } = Select;
export default class DistributionGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiManager: [],
      group: "",
      grpDropdown: "",
      groupName: "",
      groupEmail: "",
      groupMembers: "",
      groupOwner: "",
      requireDistribution: false
    };
    this.formChange = this.formChange.bind(this);
    this.CommonMailboxDataProvider = new CommonMailboxDataProvider();
  }
  componentDidUpdate() {
    this.props.getDataFromDistributionGroup(this.state);
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
          <h4 className="pt-3">Distribution group/Security group</h4>
          <hr />
          <div className="row input">
            <div className="col-4 pl-4">
              <label>Do you require distribution/security group</label>
            </div>
            <div className="col-4 pl-4">
              <Radio.Group
                name="requireDistribution"
                defaultValue={false}
                onChange={this.formChange}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </div>
          </div>
          {this.state.requireDistribution === true ? (
            <div id="section1">
              <div className="row input">
                <div className="col-4 pl-4">
                  <label>Please Select Group</label>
                </div>
                <div className="col-2">
                  <Select
                    placeholder="Select"
                    name="group"
                    style={{ width: 250 }}
                    onChange={(value) => {
                      this.setState({ group: value });
                    }}
                  >
                    {this.props.grpDropdown.map((group) => (
                      <Option
                        value={group.name}
                        label={group.name}
                        key={group.name}
                      >
                        {group.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="row input">
                <div className="col-4 pl-4">
                  <label>Group Name</label>
                </div>
                <div className="col-3">
                  <Input
                    name="groupName"
                    maxLength={25}
                    style={{ width: 250 }}
                    onChange={this.formChange}
                  />
                </div>
              </div>
              <div className="row input">
                <div className="col-4 pl-4">
                  <label>Group Email</label>
                </div>
                <div className="col-3 ">
                  <Input
                    type="email"
                    pattern={PATTERNS.EMAIL}
                    name="groupEmail"
                    style={{ width: 250 }}
                    onChange={this.formChange}
                  />
                </div>
              </div>
              <div className="row input">
                <div className="col-4 pl-4">
                  <label>Add Group Members</label>
                </div>
                <div className="col-8">
                  <Select
                    mode="multiple"
                    showSearch
                    name="groupMembers"
                    placeholder={DROPDOWN.search}
                    style={{ minWidth: 250 }}
                    onSearch={(value) => {
                      this.handleSearch(value);
                    }}
                    onChange={(value, key) => {
                      this.setState({
                        groupMembers: value.toString()
                      });
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
              <div className="row input">
                <div className="col-4 pl-4">
                  <label>Select Group Owner</label>
                </div>
                <div className="col-2 mb-3">
                  <label>
                    <Select
                      showSearch
                      name="groupOwner"
                      placeholder={DROPDOWN.search}
                      style={{ minWidth: 250 }}
                      onSearch={(value) => {
                        this.handleSearch(value);
                      }}
                      onChange={(value, key) => {
                        this.setState({ groupOwner: value });
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
                  </label>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
