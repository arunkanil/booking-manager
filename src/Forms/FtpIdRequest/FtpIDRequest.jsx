import React from "react";
import { message } from "antd";
import "../RequestTable.css";
import RequestorDetails from "../../UI/Content/RequestorDetails";
import Remarks from "../../UI/Content/Remarks";
import RequestSuccess from "../../UI/Page/RequestSuccess";
import FtpIdDataProvider from "./FtpIdDataProvider";
import { API } from "../../App/Utils/API";
import { approverAPI } from "../../App/Utils/CommonFunctions";
import { MESSAGES, FTP_FORM_ID, FORM_HEADINGS } from "../../App/Constants";
import IDrequesttable from "./Components/FtpIDRequestTable";
import { FtpIdDataSetter } from "./FtpIdDatasetter";
import FormWrapper from "../../UI/Content/FormWrapper";
API.defaults.headers.common["Authorization"] =
  "Token " + localStorage.getItem("token"); //setting authorization token

var approverData = [];
var typeDropdown = [];
var reqTypeDropdown = [];
var response = [];
var ftpid = [];
var ftpiddata = [];
var datafromRemarks = "";

function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name === nameKey) {
      return myArray[i];
    }
  }
}
function setBackUp(row) {
  //function to retrieve key of selected item in table
  let temp;
  temp = search(row["type"], typeDropdown);
  row["type"] = temp.id;
  temp = search(row["req_type"], reqTypeDropdown);
  row["req_type"] = temp.id;
  return row;
}

export default class IdRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      type: [],
      requirementType: [],
      result: false
    };
    this.formChange = this.formChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this); //binding functions
    this.approverAPI = approverAPI.bind(this);
    this.FtpIdDataProvider = new FtpIdDataProvider();
  }
  async componentDidMount() {
    approverData = await this.approverAPI(FTP_FORM_ID); //api to populate hierarchy
    const data = await this.FtpIdDataProvider.fetchDropdownList(); //api to populate fields
    if (data != null) {
      typeDropdown = data.type_list;
      reqTypeDropdown = data.required_type_list; //setting data to be populated
      this.setState({
        type: data.type_list,
        requirementType: data.required_type_list,
        loading: false
      });
    }
  }
  async formChange(event) {
    //to save changes to form
    const target = event.target;
    await this.setState({ [target.name]: target.value });
  }
  getTable(value) {
    // to get data from table component, passed as props
    ftpid = value;
    let i = 0;
    for (i = 0; i < ftpid.length; i++) {
      if (ftpid[i].validity_from == undefined) {
        ftpid[i].validity_from = null;
      }
      if (ftpid[i].validity_to == undefined) {
        ftpid[i].validity_to = null;
      }
      if (ftpid[i].ftp_uid == undefined) {
        ftpid[i].ftp_uid = null;
      }
      if (ftpid[i].folder_name == undefined) {
        ftpid[i].folder_name = null;
      }
    }
  }
  async formSubmit(event) {
    // to submit data
    event.preventDefault();
    if (ftpid.length === 0) {
      message.error(MESSAGES.enterdata);
    } else {
      this.setState({ loading: true });
      ftpid.map(row => ftpiddata.push(setBackUp(row)));
      const data = await FtpIdDataSetter(
        datafromRemarks,
        ftpiddata,
        approverData
      );
      response = await this.FtpIdDataProvider.formSubmit(data);
      if (response.result === true) {
        ftpid = [];
        ftpiddata = [];
      }
      this.setState({ result: response.result, loading: response.loading });
    }
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
            <h4 className="pt-3">FTP ID/Folders Request Details</h4>
            <hr />
              <IDrequesttable
                typeDropdown={typeDropdown}
                reqTypeDropdown={reqTypeDropdown}
                getTable={this.getTable}
              />
          </div>
        </div>
        <Remarks getDataFromRemarks={this.getDataFromRemarks} />
      </div>
    );
    if (!this.state.result) {
      //success page display check
      return (
        <FormWrapper
          formTitle={FORM_HEADINGS.FTP_FORM}
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
