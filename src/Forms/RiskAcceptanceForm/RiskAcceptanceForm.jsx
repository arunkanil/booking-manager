import React from "react";
import { Spin, Radio, message } from "antd";
import RequestorDetails from "../../UI/Content/RequestorDetails";
import AdditionalInfo from "../../UI/Content/AdditionalInformation";
import RiskAcceptanceTable from "./Components/RiskAcceptanceTable";
import { API } from "../../App/Utils/API";
import RequestSuccess from "../../UI/Page/RequestSuccess";
import { approverAPI, deptLocListAPI } from "../../App/Utils/CommonFunctions";
import { RISK_ACCEPTANCE_FORM_ID, MESSAGES, RISK_ACCEPTANCE_TEXT, FORM_HEADINGS } from "../../App/Constants";
import RiskType from "./Components/RiskType";
import { riskAcceptanceDataSetter } from "./RiskAcceptanceDatasetter";
import riskAcceptanceDataProvider from "./RiskAcceptanceDataProvider";
import FormWrapper from "../../UI/Content/FormWrapper";
API.defaults.headers.common["Authorization"] =
  "Token " + localStorage.getItem("token"); //setting authorisation token

var approverData = []; //used to store aproval hierarchy data
var risk = [];
var datafromAdditionalInfo = "";
var dataFromRiskType = "";
var response = []; //used to store data entered in table
var deptLocOBj = {}; //to store department and location

export default class RiskAcceptance extends React.Component {
  async componentDidMount() {
    approverData = await this.approverAPI(RISK_ACCEPTANCE_FORM_ID); //to fetch approver details.
    deptLocOBj = await this.deptLocListAPI(); //api to  fetch  dept and location
    this.apiSelect(); //api calling fuction to populate exception type and risk type
    if (deptLocOBj != null) {
      this.setState({
        dept: deptLocOBj.department,
        locationList: deptLocOBj.location,
        loading: false
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      requestType: 8,
      exceptionType: [],
      dept: [],
      locationList: [],
      networkForm: false,
      riskSelect: [],
      loading: true,
      loading1: true,
      result: false
    };
    this.formChange = this.formChange.bind(this); //binding functions as required in ES 6
    this.formSubmit = this.formSubmit.bind(this);
    this.approverAPI = approverAPI.bind(this);
    this.deptLocListAPI = deptLocListAPI.bind(this);
    this.riskAcceptanceDataProvider = new riskAcceptanceDataProvider();
  }

  async formChange(event) {
    //to save changes
    const target = event.target;
    await this.setState({ [target.name]: target.value });
    this.apiSelect(); //api calling fuction to populate exception type and risk type
    if (this.state.requestType === 9) {
      this.setState({ networkForm: true });
    } else {
      this.setState({ networkForm: false });
    }
  }
  getTable(value) {
    // to get data from table component, passed as props
    risk = value;
  }
  async formSubmit(event) {
    //form submit
    event.preventDefault();
    if (
      risk.length === 0 ||
      datafromAdditionalInfo.department == "" ||
      datafromAdditionalInfo.location == "" ||
      dataFromRiskType.riskType == ""
    ) {
      message.error(MESSAGES.enterdata);
    } else {
      this.setState({ loading: true });
      const data = await riskAcceptanceDataSetter(
        datafromAdditionalInfo,
        dataFromRiskType,
        risk,
        this.state.networkForm,
        approverData
      );
      response = await this.riskAcceptanceDataProvider.formSubmit(
        data
      );
      if (response.result === true) {
        risk = [];
      }
      this.setState({ result: response.result, loading: response.loading });
    }
  }
  async apiSelect() {
    //api calling fuction to populate exception type and risk type
    const data = await this.riskAcceptanceDataProvider.fetchDropdownList(
      this.state.requestType
    );
    this.setState({
      exceptionType: data.exception_type_list,
      riskSelect: data.risk_type_list,
      loading1: false
    });
  }
  getDataFromAdditionalInfo = data => {
    datafromAdditionalInfo = data;
  };
  getDataFromRiskType = data => {
    dataFromRiskType = data;
  };
  render() {
    const display = (
      <div>
        <RequestorDetails />
        <div className="row input">
          <div className="container">
            <h4 className="pt-3">Risk Type</h4>
            <hr />
            <div className="row">
              <div className="col-3 ">
                <label>Request type</label>
              </div>
              <div className="col-4 ml-3">
                <Radio.Group
                  name="requestType"
                  className="form-check-input"
                  onChange={this.formChange}
                  defaultValue={8}
                >
                  <Radio value={9}>Network</Radio>
                  <Radio value={8} className="pl-1">
                    Other
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <RiskType
              riskSelect={this.state.riskSelect}
              getDataFromRiskType={this.getDataFromRiskType}
            />
          </div>
        </div>
        <div className="row input">
          <div className="container">
            <h4 className="pt-3">Exception Details</h4>
            <hr />
            <Spin
              size="large"
              tip="Please wait..."
              spinning={this.state.loading1}
            >
              <RiskAcceptanceTable
                exceptionDrop={this.state.exceptionType}
                getTable={this.getTable}
              />
            </Spin>
          </div>
        </div>
        <AdditionalInfo
          requireIM={false}
          textareaLabel="Remarks or Additional Justification"
          dept={this.state.dept}
          locationList={this.state.locationList}
          getDataFromAdditionalInfo={this.getDataFromAdditionalInfo}
        />
        <div className=" text-danger">
          {RISK_ACCEPTANCE_TEXT}
        </div>
      </div>
    );
    if (!this.state.result) {
      return (
        <FormWrapper
          formTitle={FORM_HEADINGS.RISK_ACCEPTANCE_FORM}
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
