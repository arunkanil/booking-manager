import React from "react";
import { Input, Select, Radio } from "antd";
import { DROPDOWN } from "../../../App/Constants";
import CommonMailboxDataProvider from "../CommonMailboxDataProvider";
const { Option } = Select;
export default class SharedFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiManager: [],
      folderName: "",
      folderOwner: "",
      rightsGiven: "",
      sharedFolder:false
    };
    this.formChange = this.formChange.bind(this);
    this.CommonMailboxDataProvider = new CommonMailboxDataProvider();
  }
  componentDidUpdate() {
    this.props.getDataFromSharedFolder(this.state);
  }
  async formChange(event) {
    // funtion to save changes to form
    // to save data on change
    const target = event.target;
    await this.setState({ [target.name]: target.value });
    console.log(this.state);
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
          <h4 className="pt-3">Shared Folder</h4>
          <hr />
          <div className="row input">
            <div className="col-4 pl-4">
              <label>Do you require shared folder</label>
            </div>
            <div className="col-4 pl-4">
              <Radio.Group name="sharedFolder" defaultValue={false} onChange={this.formChange}>
                <Radio value={true} >
                  Yes
                </Radio>
                <Radio value={false} >
                  No
                </Radio>
              </Radio.Group>
            </div>
          </div>
          {this.state.sharedFolder===true?(
          <div id="section3">
            <div className="row input">
              <div className="col-4 pl-4">
                <label>Folder Name</label>
              </div>
              <div className="col-2">
                <Input
                  name="folderName"
                  maxLength={20}
                  style={{ width: 250 }}
                  onChange={this.formChange}
                />
              </div>
            </div>
            <div className="row input">
              <div className="col-4 pl-4">
                <label>Folder Owner</label>
              </div>
              <div className="col-3 ">
                <Select
                  showSearch
                  name="folderOwner"
                  placeholder={DROPDOWN.search}
                  style={{ minWidth: 250 }}
                  onSearch={(value) => {
                    this.handleSearch(value);
                  }}
                  onChange={(value, key) => {
                    this.setState({ folderOwner: value });
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
                <label>Rights to be given</label>
              </div>
              <div className="col-8">
                <Select
                  showSearch
                  mode="multiple"
                  name="rightsGiven"
                  placeholder={DROPDOWN.search}
                  style={{ minWidth: 250 }}
                  onSearch={(value) => {
                    this.handleSearch(value);
                  }}
                  onChange={(value, key) => {
                    this.setState({ rightsGiven: value.toString() });
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
