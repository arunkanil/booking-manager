import React from "react";
import RequestorDetails from "../../UI/Content/RequestorDetails";
import DistributionGroup from "./Components/DistributionGroup";
import SharedMailbox from "./Components/SharedMailbox";
import SharedFolder from "./Components/SharedFolder";
import CommonLoginID from "./Components/CommonLoginID";
import AdditionalInfo from "../../UI/Content/AdditionalInformation";
import CommonMailboxDataProvider from "./CommonMailboxDataProvider";
import { API } from "../../App/Utils/API";
import { COMMON_MAILBOX_FORM_ID, FORM_HEADINGS } from "../../App/Constants";
import {
  approverAPI,
  deptLocListAPI,
} from "../../App/Utils/CommonFunctions";
import RequestSuccess from "../../UI/Page/RequestSuccess";
import { commonMailboxDataSetter } from "./CommonMailboxDataSetter";
import FormWrapper from "../../UI/Content/FormWrapper";
API.defaults.headers.common["Authorization"] =
  "Token " + localStorage.getItem("token");

var dataFromDistributionGroup = "";
var dataFromSharedMailbox = "";
var dataFromSharedFolder = "";
var dataFromCommonLoginID = "";
var datafromAdditionalInfo = "";

var response = [];
var approverData = []; //approver hierarchy list
const form_id = COMMON_MAILBOX_FORM_ID;

var deptLocOBj = {}; //to store department and location
export default class CommonMailboxRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grpDropdown: [],
      appover_name: [],
      appover_title: [],
      approver_outlook_id: [],
      approver_level: [],
      dept: [],
      locationList: [],
      result: false,
      loading: true
    };
    //initialize method
    this.formChange = this.formChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.approverAPI = approverAPI.bind(this);
    this.deptLocListAPI = deptLocListAPI.bind(this);
    this.CommonMailboxDataProvider = new CommonMailboxDataProvider();
  }
  async componentDidMount() {
    approverData = await this.approverAPI(form_id.toString()); //api to populate hierarchy
    deptLocOBj = await this.deptLocListAPI(); //api to  fetch  dept and location
    const response = await this.CommonMailboxDataProvider.fetchDropdownList(); //api to get dropdown group list
    if (deptLocOBj != null) {
      this.setState({
        grpDropdown: response,
        dept: deptLocOBj.department,
        locationList: deptLocOBj.location,
        loading: false
      });
    }
  }

  formChange(event) {
    //to save changes to form
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  async formSubmit(event) {
    // to submit data
    event.preventDefault();
    this.setState({ loading: true });
    const data = await commonMailboxDataSetter(
      dataFromDistributionGroup,
      dataFromSharedMailbox,
      dataFromSharedFolder,
      dataFromCommonLoginID,
      datafromAdditionalInfo,
      approverData
    );
    response = await this.CommonMailboxDataProvider.formSubmit(data);
    this.setState({ result: response.result, loading: response.loading });
  }
  getDataFromDistributionGroup = data => {
    dataFromDistributionGroup = data;
  };
  getDataFromSharedMailbox = data => {
    dataFromSharedMailbox = data;
  };
  getDataFromSharedFolder = data => {
    dataFromSharedFolder = data;
  };
  getDataFromCommonLoginID = data => {
    dataFromCommonLoginID = data;
  };
  getDataFromAdditionalInfo = data => {
    datafromAdditionalInfo = data;
  };
  render() {
    const display = (
      <div>
        <RequestorDetails />
        <DistributionGroup
          grpDropdown={this.state.grpDropdown}
          getDataFromDistributionGroup={this.getDataFromDistributionGroup}
        />
        <SharedMailbox
          getDataFromSharedMailbox={this.getDataFromSharedMailbox}
        />
        <SharedFolder getDataFromSharedFolder={this.getDataFromSharedFolder} />
        <CommonLoginID
          getDataFromCommonLoginID={this.getDataFromCommonLoginID}
        />
        <AdditionalInfo
          requireIM={false}
          textareaLabel="Purpose"
          dept={this.state.dept}
          locationList={this.state.locationList}
          getDataFromAdditionalInfo={this.getDataFromAdditionalInfo}
        />
      </div>
    );
    if (this.state.result === false) {
      //success page display check
      return (
        <FormWrapper
          formTitle={FORM_HEADINGS.COMMON_MAILBOX_FORM}
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
