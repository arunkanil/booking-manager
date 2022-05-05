import React from "react";
import { Input, DatePicker, Radio, Select, InputNumber } from "antd";
import loginIdCreationDataprovider from "../LoginIdCreationDataprovider";
const { Option } = Select;
export default class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: true,
      employeeType: "",
      apiManager: [],
      sapCode: "",
      isLoginOrMailbox: false,
      sbu: "",
      isTempAccessId: false,
      fromDt: "",
      toDt: "",
      isAccessId: false,
      firstName: "",
      lastName: "",
      department: "",
      essarCompany: "",
      designation: "",
      reportingManagerName: "",
      reportingManagerMail: ""
    };
    this.formChange = this.formChange.bind(this);
    this.loginIdCreationDataprovider = new loginIdCreationDataprovider();
  }
  componentDidUpdate() {
    this.props.getDataFromUserDetails(this.state);
  }
  async formChange(event) {
    // funtion to save changes to form
    // to save data on change
    const target = event.target;
    await this.setState({ [target.name]: target.value });
  }
  formHide = (a) => e => {
    // to hide sections of the form
    document.getElementById(a).style.display = "none";
  };
  formShow = (b) => e => {
    // to show sections of the form
    document.getElementById(b).style.display = "block";
  };
  async handleSearch(value){
    //api to fill in multiselect people picker
    const response = await this.loginIdCreationDataprovider.handleSearch(value);
    this.setState({ apiManager: response });
  }
  render() {
    return (
      <div className="container">
        <h4 className=" pt-3">User details</h4>
        <hr />
        <div className="row input">
          <div className="col-2 ">Employee type</div>
          <div className="col-4 ">
            <Select
              name="employeeType"
              placeholder="Select"
              onChange={(value) => {
                this.setState({ employeeType: value });
              }}
            >
              {this.props.apiEmpType.map((person) => (
                <Option value={person.id} label={person.name} key={person.id}>
                  {person.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="col-2 ">SAP code</div>
          <div className="col-4 ">
            <InputNumber
              name="sapCode"
              style={{minWidth:"40%"}}
              maxLength={10}
              required={true}
              onChange={(value)=>{this.setState({sapCode:value})}}
            />
          </div>
        </div>
        <div className="row input">
          <div className="col-3 ">Login/Mailbox required?</div>
          <div className="col-3 ">
            <Radio.Group
              name="isLoginOrMailbox"
              onChange={this.formChange}
              defaultValue={false}
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </div>
          <div className="col-2 ">SBU</div>
          <div className="col-4 ">
            <Select
              name="sbu"
              placeholder="Select"
              onChange={(value) => {
                this.setState({ sbu: value });
              }}
            >
              {this.props.apiSbu.map((person) => (
                <Option value={person.id} label={person.name} key={person.id}>
                  {person.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="row input">
          <div className="col-3 ">Access ID card temporary?</div>
          <div className="col-3">
            <Radio.Group
              name="isTempAccessId"
              onChange={this.formChange}
              defaultValue={false}
            >
              <Radio onClick={this.formShow("dateSection")} value={true}>
                Yes
              </Radio>
              <Radio onClick={this.formHide("dateSection")} value={false}>
                No
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div id="dateSection" className="hide">
          <div className="row input mt-3">
            <div className="col-2 ">Period</div>
            <div className="col-2 ">
              <DatePicker
                placeholder="From Date"
                name="fromDt"
                onChange={(date, dateString) => {
                  this.setState({ fromDt: dateString });
                }}
              />
            </div>
            <div className="col-2 ">
              <DatePicker
                placeholder="To Date"
                name="toDt"
                onChange={(date, dateString) => {
                  this.setState({ toDt: dateString });
                }}
              />
            </div>
          </div>
        </div>
        <div className="row input mt-3">
          <div className="col-3 ">Access ID card required ?</div>
          <div className="col-3 ">
            <Radio.Group
              name="isAccessId"
              onChange={this.formChange}
              defaultValue={false}
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="row input">
          <div className="col-2 ">Employee name</div>
          <div className="col-4 ">
            <Input
              required={true}
              name="firstName"
              onChange={this.formChange}
              placeholder="First Name"
              style={{ width: "49%" }}
            />
            <Input
              required={true}
              name="lastName"
              onChange={this.formChange}
              placeholder="Last Name"
              style={{ width: "49%", marginLeft: "5px" }}
            />
          </div>
          <div className="col-2 ">Department</div>
          <div className="col-4 ">
            <Select
              placeholder="Select"
              name="department"
              onChange={(value) => {
                this.setState({ department: value });
              }}
            >
              {this.props.apiDepartment.map((person) => (
                <Option value={person.id} label={person.name} key={person.name}>
                  {person.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="row input">
          <div className="col-2 ">Essar company</div>
          <div className="col-4 ">
            <Select
              name="essarCompany"
              placeholder="Select"
              onChange={(value) => {
                this.setState({ essarCompany: value });
              }}
            >
              {this.props.apiCompany.map((person) => (
                <Option value={person.id} label={person.name} key={person.name}>
                  {person.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="col-2 ">Designation</div>
          <div className="col-4 ">
            <Input
              required={true}
              name="designation"
              placeholder="Enter your designation"
              onChange={this.formChange}
            />
          </div>
        </div>
        <div className="row input mt-4">
          <div className="col-2 ">Manager name</div>
          <div className="col-4 ">
            <Select
              showSearch
              name="reportingManagerName"
              placeholder="Select"
              onSearch={(value) => {
                this.handleSearch(value);
              }}
              onChange={(value, key) => {
                this.setState({
                  reportingManagerName: value,
                  reportingManagerMail: key.key
                });
              }}
            >
              {this.state.apiManager.map((person) => (
                <Option
                  value={person.name}
                  label={person.name}
                  key={person.mail}
                >
                  {person.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="col-2 ">Manager Email</div>
          <div className="col-4 ">
            <Input
              disabled
              name="reportingManagerMail"
              onChange={this.formChange}
              value={this.state.reportingManagerMail}
            />
          </div>
        </div>
      </div>
    );
  }
}
