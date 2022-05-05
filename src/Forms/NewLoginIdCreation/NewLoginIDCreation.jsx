import React from "react";
import { API } from "../../App/Utils/API";
import RequestSuccess from "../../UI/Page/RequestSuccess";
import UserDetails from "./Components/UserDetails";
import ContactDetails from "./Components/ContactDetails";
import loginIdCreationDataprovider from "./LoginIdCreationDataprovider";
import EmergencyContactDetails from "./Components/EmergencyDetails";
import { message } from "antd";
import { MESSAGES, FORM_HEADINGS } from "../../App/Constants";
import { loginIdCreationDataSetter } from "./LoginIdCreationDatasetter";
import FormWrapper from "../../UI/Content/FormWrapper";
import Remarks from "../../UI/Content/Remarks";
import Attachments from "./Components/Attachments";
API.defaults.headers.common["Authorization"] =
  "Token " + localStorage.getItem("token"); //setting token authentication

var formData = new FormData();              //to store data to be sent
var userDetails = "";
var contactDetails = "";
var emergencyContactDetails = "";
var dataFromRemarks = "";
var uploadfile=null;
export default class NewLoginIDCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: false,
      apiEmpType: [],
      apiApprover1: [],
      apiDepartment: [],
      apiCompany: [],
      apiDesignation: [],
      apiSbu: [],
      apiCity: [],
      apiCountry: []
    };
    this.formChange = this.formChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.loginIdCreationDataprovider = new loginIdCreationDataprovider();
  }
  async componentDidMount() {
    const response = await this.loginIdCreationDataprovider.fetchDropdownList();
    if(response!=null){
      this.setState({
        apiEmpType: response.employee_types,
        apiApprover1: response.hierarchy,
        apiDepartment: response.departments,
        apiCompany: response.companies,
        apiDesignation: response.designations,
        apiState: response.states,
        apiCountry: response.countries,
        apiSbu: response.sbu,
        apiCity: response.location,
        loading: false
      });
    }
  }
  async formChange(event) {
    // funtion to save changes to form
    // to save data on change
    const target = event.target;
    await this.setState({ [target.name]: target.value });
  }

  async formSubmit(event, value) {
    //to submit data to backend
    event.preventDefault();
    if (
      userDetails.employeeType === "" ||
      userDetails.sbu === "" ||
      userDetails.department === "" ||
      userDetails.essarCompany === "" ||
      userDetails.reportingManagerName === "" ||
      contactDetails.dtOfJoining === "" ||
      contactDetails.bloodGp === "" ||
      contactDetails.country === "" ||
      contactDetails.city === ""
    ){
      message.error(MESSAGES.enterdata);
    }
    else {
      this.setState({ loading: true });
      formData = await loginIdCreationDataSetter(
        userDetails,
        contactDetails,
        emergencyContactDetails,
        dataFromRemarks.remarks
      )
      formData.append("profile_image", uploadfile);
      this.submitApi();
    }
  }

  async submitApi() {
    //submit function
    const response = await this.loginIdCreationDataprovider.formSubmit(formData)
    this.setState({ result: response.result, loading: response.loading });
  }
  getDataFromContactDetails = (data) => {
    contactDetails = data;
  };
  getDataFromUserDetails = (data) => {
    userDetails = data;
  };
  getDataFromEMContactDetails = (data) => {
    emergencyContactDetails = data;
  };
  getDataFromRemarks = (data) => {
    dataFromRemarks = data;
  };
  getDataFromAttachments = (data) => {
    uploadfile=data;
  }

  render() {
    const display = (
      <div>
        <UserDetails
          apiEmpType={this.state.apiEmpType}
          apiSbu={this.state.apiSbu}
          apiDepartment={this.state.apiDepartment}
          apiCompany={this.state.apiCompany}
          getDataFromUserDetails={this.getDataFromUserDetails}
        />
        <ContactDetails
          apiCity={this.state.apiCity}
          apiCountry={this.state.apiCountry}
          getDataFromContactDetails={this.getDataFromContactDetails}
        />
        <EmergencyContactDetails
          getDataFromEMContactDetails={this.getDataFromEMContactDetails}
        />
        <Attachments
          getDataFromAttachments={this.getDataFromAttachments}
        />
        <Remarks
          getDataFromRemarks={this.getDataFromRemarks}
        />
      </div>
    );
    if (this.state.result === false) {
      //check for displaying success page
      return (
        <FormWrapper
          formTitle={FORM_HEADINGS.NEW_LOGIN_FORM}
          formSubmit={this.formSubmit}
          loading={this.state.loading}
          display={display}
          approverData={this.state.apiApprover1}
        />
      );
    } else {
      return <RequestSuccess />;
    }
  }
}