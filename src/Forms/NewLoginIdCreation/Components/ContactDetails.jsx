import React from "react";
import { Input, DatePicker, InputNumber, Select } from "antd";
import { PHONE_MAXLENGTH, PATTERNS } from "../../../App/Constants";
const { Option } = Select;
export default class ContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        apiCity:[],
        apiCountry:[],
        mobile:"",
        dtOfJoining:"",
        phone:"",
        voipLoc:"",
        bloodGp:"",
        address:"",
        city:"",
        state:"",
        country:"",
        zipcode:"",
    };
    this.formChange = this.formChange.bind(this);
  }
  componentDidUpdate(){
    this.props.getDataFromContactDetails(this.state);
  }
  /**
   * saves changes to form
   * @param {*} event //target data 
   */
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
          <h4 className=" pt-3">Contact details</h4>
          <hr />
          <div className="row input">
            <div className="col-2 ">Mobile number</div>
            <div className="col-4 ">
              <Input
                type="text"
                maxLength={PHONE_MAXLENGTH}
                pattern={PATTERNS.PHONE}
                name="mobile"
                placeholder="10 digit phone number"
                onChange={this.formChange}
                required={true}
              />
            </div>
            <div className="col-2 ">Date of joining</div>
            <div className="col-4 ">
              <DatePicker
                name="dtOfJoining"
                onChange={(date, dateString) => {
                  this.setState({ dtOfJoining: dateString });
                }}
              />
            </div>
          </div>
          <div className="row input">
            <div className="col-2 ">Alternate number</div>
            <div className="col-4 ">
              <Input
                type="text"
                maxLength={PHONE_MAXLENGTH}
                pattern={PATTERNS.PHONE}
                name="phone"
                placeholder="10 digit phone number"
                onChange={this.formChange}
                required={true}
              />
            </div>
            <div className="col-2 ">VOIP Location</div>
            <div className="col-4 ">
              <Input
                type="text"
                maxLength={20}
                name="voipLoc"
                required={true}
                onChange={this.formChange}
              />
            </div>
          </div>
          <div className="row input">
            <div className="col-2 ">Blood group</div>
            <div className="col-4 ">
              <Select
                showSearch
                name="bloodGp"
                placeholder="Select"
                onChange={(value) => {
                  this.setState({ bloodGp: value });
                }}
              >
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="O+">O+</Option>
                <Option value="O-">O-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
              </Select>
            </div>
            <div className="col-2 ">Street/House No.</div>
            <div className="col-4 ">
              <Input
                name="address"
                required={true}
                onChange={this.formChange}
              />
            </div>
          </div>
          <div className="row input">
            <div className="col-2 ">City</div>
            <div className="col-4 ">
              <Select
                name="city"
                placeholder="Select"
                onChange={(value) => {
                  this.setState({ city: value });
                }}
              >
                {this.props.apiCity.map((person) => (
                  <Option
                    value={person.id}
                    label={person.name}
                    key={person.id}
                  >
                    {person.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-2 ">State</div>
            <div className="col-4 ">
              <Input
                name="state"
                placeholder="Enter State"
                onChange={this.formChange}
                required={true}
              />
            </div>
          </div>
          <div className="row input">
            <div className="col-2 ">Country</div>
            <div className="col-4 ">
              <Select
                name="country"
                placeholder="Select"
                onChange={(value) => {
                  this.setState({ country: value });
                }}
              >
                {this.props.apiCountry.map((person) => (
                  <Option
                    value={person.id}
                    label={person.name}
                    key={person.name}
                  >
                    {person.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-2 ">ZIP code</div>
            <div className="col-4 ">
              <InputNumber
                type="number"
                name="zipcode"
                style={{minWidth:"40%"}}
                min={100000}
                max={999999}
                required={true}
                onChange={(value)=>{this.setState({zipcode:value})}}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}