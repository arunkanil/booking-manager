import React from "react";
import { Spin, message } from "antd";
import RequestorDetails from "../../UI/Content/RequestorDetails";
import Remarks from "../../UI/Content/Remarks";
import RestorationDataProvider from "./RestorationDataProvider";
import "../RequestTable.css";
import EditableTable1 from "./Components/RestorationRequestTable";
import { API } from "../../App/Utils/API";
import RequestSuccess from "../../UI/Page/RequestSuccess";
import { approverAPI } from "../../App/Utils/CommonFunctions";
import { RESTORATION_FORM_ID, MESSAGES, FORM_HEADINGS } from "../../App/Constants";
import { restorationRequestDataSetter } from "./RestorationRequestDataSetter";
import FormWrapper from "../../UI/Content/FormWrapper";
API.defaults.headers.common["Authorization"] =
  "Token " + localStorage.getItem("token");

var approverData = [];
var backup = [];
var response = [];
var datafromRemarks = "";
export default class Restoration extends React.Component {
  async componentDidMount() {
    approverData = await this.approverAPI(RESTORATION_FORM_ID); //to populate Approval hierarchy
    let data = await this.RestorationDataProvider.fetchDropdownList(); //api call fuction to populate type
    this.setState({ type: data, loading: false });
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      type: [],
      result: false
    };
    this.formChange = this.formChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.approverAPI = approverAPI.bind(this);
    this.RestorationDataProvider = new RestorationDataProvider();
  }
  formChange(event) {
    //to save changes to form
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }
  async formSubmit(event) {
    event.preventDefault();
    if (backup.length === 0) {
      message.error(MESSAGES.enterdata);
    } else {
      // to submit data
      this.setState({ loading: true });
      const data = await restorationRequestDataSetter(
        datafromRemarks,
        backup,
        approverData
      );
      response = await this.RestorationDataProvider.formSubmit(
        data
      );
      if (response.result === true) {
        backup = [];
      }
      this.setState({ result: response.result, loading: response.loading });
    }
  }
  getTable(value) {
    // to get data from table component, passed as props
    backup = value;
  }
  getDataFromRemarks = data => {
    datafromRemarks = data;
  };
  render() {
    const display = (
      <div>
        <RequestorDetails />
        <div className="row input">
          <div className="container">
            <h4 className="pt-3">
              Files/Folders/Database/E-Mail for restoration
            </h4>
            <hr />
            <Spin
              size="large"
              tip="Please wait..."
              spinning={this.state.loading}
            >
              <EditableTable1
                typedropdown={this.state.type}
                getTable={this.getTable}
              />
            </Spin>
          </div>
        </div>
        <Remarks getDataFromRemarks={this.getDataFromRemarks} />
      </div>
    );
    if (this.state.result === false) {
      //success page display check
      return (
        <FormWrapper
          formTitle={FORM_HEADINGS.RESTORATION_FORM}
          formSubmit={this.formSubmit}
          loading={this.state.loading}
          display={display}
          approverData={approverData}
        />
      );
    } else {
      return <RequestSuccess />;
    }
  }
}
