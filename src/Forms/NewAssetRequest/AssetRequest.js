import React from "react";
import { Spin, message } from "antd";
import RequestorDetails from "../../UI/Content/RequestorDetails";
import EditableTable from "./Components/AssetRequestTable";
import AdditionalInfo from "../../UI/Content/AdditionalInformation";
import assetRequestDataProvider from "./AssetRequestDataProvider";
import { API } from "../../App/Utils/API";                //configured instance of axios
import { NEW_ASSET_FORM_ID, MESSAGES, FORM_HEADINGS } from "../../App/Constants"; //form id
import { approverAPI, deptLocListAPI } from "../../App/Utils/CommonFunctions";
import RequestSuccess from "../../UI/Page/RequestSuccess"; //success page to display
import "../RequestTable.css";
import { assetRequestDataSetter } from "./AssetRequestDataSetter";
import FormWrapper from "../../UI/Content/FormWrapper";
API.defaults.headers.common["Authorization"] = //setting token authentication
  "Token " + localStorage.getItem("token");

var datafromAdditionalInfo = "";
var approverData = []; // Approver list data
var tableData = []; // data from editable table
var response = [];
const form_id = NEW_ASSET_FORM_ID;
var deptLocOBj = {};

export default class AssetRequest extends React.Component {
  async componentDidMount() {
    approverData = await this.approverAPI(form_id.toString());
    const data = await this.assetRequestDataProvider.fetchDropdownList();
    deptLocOBj = await this.deptLocListAPI(); //api to  fetch  dept and location
    if (deptLocOBj != null) {
      this.setState({
        request_type: data.request_type_list,
        dept: deptLocOBj.department,
        locationList: deptLocOBj.location,
        loading: false
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      request_type: [],
      dept: [],
      locationList: [],
      loading: true,
      result: false
    };
    this.formChange = this.formChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.approverAPI = approverAPI.bind(this);
    this.getTable = this.getTable.bind(this);
    this.deptLocListAPI = deptLocListAPI.bind(this);
    this.assetRequestDataProvider = new assetRequestDataProvider();
  }
  getTable(tableDataVal) {
    // to get data from table component, passed as props
    tableData = tableDataVal;
    let i = 0;
    for (i = 0; i < tableData.length; i++) {
      if (tableData[i].from_date === undefined) {
        tableData[i].from_date = null;
      }
      if (tableData[i].to_date === undefined) {
        tableData[i].to_date = null;
      }
      if (tableData[i].transfer_to === undefined) {
        tableData[i].transfer_to = null;
      }
    }
  }
  formChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }
  getDataFromAdditionalInfo = (data) => {
    datafromAdditionalInfo = data;
  };
  async formSubmit(event) {
    event.preventDefault();
    if(tableData.length === 0 ||
      datafromAdditionalInfo.department === "" ||
      datafromAdditionalInfo.location === ""
    ) {
      message.error(MESSAGES.enterdata);
    } else {
      this.setState({ loading: true });
      const data = await assetRequestDataSetter(
        datafromAdditionalInfo,
        tableData,
        approverData
      );
      response = await this.assetRequestDataProvider.formSubmit(data);
      if (response.result === true) {
        tableData = [];
      }
      this.setState({ result: response.result, loading: response.loading });
    }
  }
  render() {
    const display = (
      <div>
        <RequestorDetails />
        <div className="row input">
          <div className="container">
            <h4 className="pt-3">Asset Required</h4>
            <hr />
            <Spin
              size="large"
              tip="Please wait..."
              spinning={this.state.loading}
            >
              <EditableTable
                requesttypedrop={this.state.request_type}
                getTable={this.getTable}
              />
            </Spin>
          </div>
        </div>
        <AdditionalInfo
          requireIM={true}
          textareaLabel="Purpose"
          dept={this.state.dept}
          locationList={this.state.locationList}
          getDataFromAdditionalInfo={this.getDataFromAdditionalInfo}
        />
      </div>
    );
    if (this.state.result === false) {
      return (
        <FormWrapper
          formTitle={FORM_HEADINGS.NEW_ASSET_FORM}
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
