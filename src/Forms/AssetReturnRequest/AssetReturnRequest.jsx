import React from "react";
import { Spin, message } from "antd";
import RequestorDetails from "../../UI/Content/RequestorDetails";
import AssetReturnTable from "./Components/AssetReturnRequestTable";
import AssetReturnDataProvider from "./AssetReturnDataProvider";
import AdditionalInfo from "../../UI/Content/AdditionalInformation";
import RequestSuccess from "../../UI/Page/RequestSuccess";
import { API } from "../../App/Utils/API";
import { approverAPI, deptLocListAPI } from "../../App/Utils/CommonFunctions";
import { RETURN_ASSET_FORM_ID, MESSAGES, FORM_HEADINGS } from "../../App/Constants";
import "../RequestTable.css";
import { AssetReturnDataSetter } from "./AssetReturnDataSetter";
import FormWrapper from "../../UI/Content/FormWrapper";
API.defaults.headers.common["Authorization"] =
  "Token " + localStorage.getItem("token"); //setting authorisation token

var datafromAdditionalInfo = "";
var approverData = []; //to store approver hierarchy data
var backup = []; //to store table data
var response = []; //to store response of apiSubmit
const formId = RETURN_ASSET_FORM_ID; //from id for request submitting
var deptLocOBj = {}; //to store values populated department and location dropdowns
//Class
// send request for return Asset
// editable table is used for taking input asset data
export default class AssetReturnRequest extends React.Component {
  async componentDidMount() {
    approverData = await this.approverAPI(formId); //initial api call to fetch approver hierarchy data
    deptLocOBj = await this.deptLocListAPI(); //initial api call to  fetch list  of dept and location
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
      dept: [],
      locationList: [],
      loading: true,
      result: false
    };
    //initialize methods
    this.formSubmit = this.formSubmit.bind(this);
    this.approverAPI = approverAPI.bind(this); // binding  approver function
    this.deptLocListAPI = deptLocListAPI.bind(this);
    this.AssetReturnDataProvider = new AssetReturnDataProvider();
  }
  getTable(value) {
    // to get data from table component, passed as props
    backup = value;
  }
  getDataFromAdditionalInfo = data => {
    datafromAdditionalInfo = data;
  };
  // on click submit button this function is called. if all the fields are not empty, return request will be posted
  async formSubmit(event) {
    event.preventDefault();
    if (
      backup.length === 0 ||
      datafromAdditionalInfo.department === "" ||
      datafromAdditionalInfo.location === ""
    ) {
      message.error(MESSAGES.enterdata);
    } else {
      this.setState({ loading: true });
      const data = await AssetReturnDataSetter(
        datafromAdditionalInfo,
        backup,
        approverData
      );
      response = await this.AssetReturnDataProvider.formSubmit(
        //set data accordingly in one object.
        data
      );
      if (response.result === true) {
        backup = [];
      }
      this.setState({ result: response.result, loading: response.loading });
    }
  }
  render() {
    //  initialy result value is false
    //  result got value as true after data post successfull, and show request success page
    //  here checking the status of result
    const display = (
      <div>
        <RequestorDetails />
        <div className="row input">
          <div className="container">
            <h4 className="pt-3">Asset Details</h4>
            <hr />
            <Spin
              size="large"
              tip="Please wait..."
              spinning={this.state.loading}
            >
              {/* call Asset return table , pass return type list for dropdown data
                     through get table function it will pass the input data from table */}
              <AssetReturnTable getTable={this.getTable} />
            </Spin>
          </div>
        </div>
        <AdditionalInfo
          requireIM={false}
          textareaLabel="Reason"
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
          formTitle={FORM_HEADINGS.RETURN_ASSET_FORM}
          formSubmit={this.formSubmit}
          loading={this.state.loading}
          display={display}
          approverData={approverData}
        />
      );
    } else {
      // request success page , after post successfull it will show
      return <RequestSuccess />;
    }
  }
}
