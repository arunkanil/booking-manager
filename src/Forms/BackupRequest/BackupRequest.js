import React from "react";
import "../RequestTable.css";
import { Spin, message } from "antd";
import BackupRequestDataProvider from "./BackupRequestDataProvider";
import { approverAPI, deptLocListAPI } from "../../App/Utils/CommonFunctions";
import EditableTable from "./Components/BackupRequestTable";
import RequirementType from "./Components/RequirementType";
import RequestorDetails from "../../UI/Content/RequestorDetails";
import AdditionalInfo from "../../UI/Content/AdditionalInformation";
import { backupRequestDataSetter } from "./BackupRequestDataSetter";
import { API } from "../../App/Utils/API"; //configured instance of axios
import { BACKUP_FORM_ID, MESSAGES, FORM_HEADINGS } from "../../App/Constants"; //form id
import RequestSuccess from "../../UI/Page/RequestSuccess"; //success page to be displayed
import FormWrapper from "../../UI/Content/FormWrapper";
API.defaults.headers.common["Authorization"] =
  "Token " + localStorage.getItem("token");

var backup = []; //to store table data
var response = []; //to store response of apiSubmit
var deptLocOBj = {}; // return catcher of dept and loc Api
var approverData = []; //to store approver hierarchy data
var dataFromRequirementType = "";
var datafromAdditionalInfo = "";
const formId = BACKUP_FORM_ID; //from id for request submitting

export default class Backup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirementType: "",
      backupType: "",
      purpose: "",
      department: "",
      location: "",
      loading: true,
      hod: "",
      dept: [],
      backup: [],
      locationList: [],
      result: false
    };
    this.formChange = this.formChange.bind(this); //intialize methods
    this.formSubmit = this.formSubmit.bind(this);
    this.approverAPI = approverAPI.bind(this);
    this.getTable = this.getTable.bind(this);
    this.deptLocListAPI = deptLocListAPI.bind(this);
    this.BackupRequestDataProvider = new BackupRequestDataProvider(); //dataprovider object creation
  }
  async componentDidMount() {
    approverData = await this.approverAPI(formId.toString()); // api to fetch approver hierarchy
    deptLocOBj = await this.deptLocListAPI(); //api to  fetch  dept and location
    if (deptLocOBj != null) {
      this.setState({
        //setting data to be populated onto state.
        dept: deptLocOBj.department,
        locationList: deptLocOBj.location,
        loading: false
      });
    }
    //fetch  all dropdown list
  }
  async formChange(event) {
    //to save changes to form
    const target = event.target;
    await this.setState({ [target.name]: target.value });
  }
  getTable(value) {
    // to get data from table component, passed as props
    backup = value;
  }
  getDataFromRequirementType = (data) => {
    //to get data from requirement type component
    dataFromRequirementType = data;
  };
  getDataFromAdditionalInfo = (data) => {
    //to get data from additional info component
    datafromAdditionalInfo = data;
  };
  async formSubmit(event) {
    // to submit data
    event.preventDefault();
    if (
      datafromAdditionalInfo.department === "" ||
      datafromAdditionalInfo.location === "" || //validation to check whether data is entered or not
      dataFromRequirementType.requirementType === "" ||
      dataFromRequirementType.backupType === "" ||
      backup.length === 0
    ) {
      message.error(MESSAGES.enterdata);
    } else {
      this.setState({ loading: true });
      const data = await backupRequestDataSetter(
        dataFromRequirementType,
        datafromAdditionalInfo,
        backup,
        approverData
      );
      response = await this.BackupRequestDataProvider.formSubmit(
        data
      );
      if (response.result === true) {
        backup = [];
      }
      this.setState({ result: response.result, loading: response.loading });
    }
  }
  render() {
    if (this.state.result === false) {
      //success page display check
      const display = (
        <div>
          <RequestorDetails />
          <RequirementType
            getDataFromRequirementType={this.getDataFromRequirementType}
          />
          <div className="row">
            <div className="container pb-3">
              <h4 className="pt-3">Backup Details</h4>
              <hr />
              <Spin
                size="large"
                tip="Please wait..."
                spinning={this.state.loading}
              >
                <EditableTable
                  getTable={this.getTable} // method to get input values from table
                />
              </Spin>
            </div>
          </div>
          <AdditionalInfo
            requireIM={false}
            textareaLabel="Purpose"
            dept={this.state.dept}
            locationList={this.state.locationList}
            getDataFromAdditionalInfo={this.getDataFromAdditionalInfo}
          />
        </div>
      );
      return (
        <FormWrapper
          formTitle={FORM_HEADINGS.BACKUP_FORM}
          formSubmit={this.formSubmit}
          loading={this.state.loading}
          display={display}
          approverData={approverData}
        />
      );
    } else {
      //success page to display on submission.
      return <RequestSuccess />;
    }
  }
}