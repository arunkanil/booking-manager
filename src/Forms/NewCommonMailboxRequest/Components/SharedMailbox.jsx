import React from "react";
import { Input, Select, Radio } from "antd";
import { DROPDOWN, PATTERNS } from "../../../App/Constants";
import CommonMailboxDataProvider from "../CommonMailboxDataProvider";
const { Option } = Select;
export default class SharedMailbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiManager: [],
      mailboxName: "",
      mailboxEmail: "",
      mailboxOwner: "",
      shared_mailbox: false
    };
    this.formChange = this.formChange.bind(this);
    this.CommonMailboxDataProvider = new CommonMailboxDataProvider();
  }
  componentDidUpdate() {
    this.props.getDataFromSharedMailbox(this.state);
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
      <div className="row">
        <div className="container pb-3">
          <h4 className="pt-3">Shared Mailbox</h4>
          <hr />
          <div className="row input">
            <div className="col-4 pl-4">
              <label>Do you require shared mailbox ?</label>
            </div>
            <div className="col-4 pl-4">
              <Radio.Group
                name="shared_mailbox"
                defaultValue={false}
                onChange={this.formChange}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </div>
          </div>
          {this.state.shared_mailbox === true ? (
            <div id="section2">
              <div className="row input">
                <div className="col-4 pl-4">
                  <label>Mailbox display name</label>
                </div>
                <div className="col-2">
                  <Input
                    maxLength={20}
                    name="mailboxName"
                    style={{ width: 250 }}
                    onChange={this.formChange}
                  />
                </div>
              </div>
              <div className="row input">
                <div className="col-4 pl-4">
                  <label>Mailbox Email ID</label>
                </div>
                <div className="col-3 ">
                  <Input
                    name="mailboxEmail"
                    type="email"
                    pattern={PATTERNS.EMAIL}
                    style={{ width: 250 }}
                    onChange={this.formChange}
                  />
                </div>
              </div>
              <div className="row input">
                <div className="col-4 pl-4">
                  <label>Select Mailbox Owner</label>
                </div>
                <div className="col-8">
                  <label>
                    <Select
                      showSearch
                      name="mailboxOwner"
                      placeholder={DROPDOWN.search}
                      style={{ minWidth: 250 }}
                      onSearch={(value) => {
                        this.handleSearch(value);
                      }}
                      onChange={(value, key) => {
                        this.setState({ mailboxOwner: value });
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
