import { NEW_LOGIN_FORM_ID } from "../../App/Constants";
var formData = new FormData();
//function set up payload object for submitting data. returns all data in a
//single object to post api.
export async function loginIdCreationDataSetter(
  userDetails,
  contactDetails,
  emergencyContactDetails,
  comments
) {
  formData.append("employee_type", userDetails.employeeType);
  formData.set("sap_code", userDetails.sapCode);
  formData.set("is_login_or_mailbox", userDetails.isLoginOrMailbox);
  formData.set("is_access_id", userDetails.isAccessId);
  formData.set("from_dt", userDetails.fromDt);
  formData.set("is_temp_access_id", userDetails.isTempAccessId);
  formData.set("to_dt", userDetails.toDt);
  formData.set("sbu", userDetails.sbu);
  formData.set("employee_name",userDetails.firstName + " " + userDetails.lastName);
  formData.set("department", userDetails.department);
  formData.set("essar_company", userDetails.essarCompany);
  formData.set("designation", userDetails.designation);
  formData.set("reporting_manager_name", userDetails.reportingManagerName);
  formData.set("reporting_manager_mail", userDetails.reportingManagerMail);
  formData.set("mobile", contactDetails.mobile);
  formData.set("phone", contactDetails.phone);
  formData.set("dt_of_joining", contactDetails.dtOfJoining);
  formData.set("blood_gp", contactDetails.bloodGp);
  formData.set("voip_loc", contactDetails.voipLoc);
  formData.set("address", contactDetails.address);
  formData.set("state", contactDetails.state);
  formData.set("country", contactDetails.country);
  formData.set("zipcode", contactDetails.zipcode);
  formData.set("city", contactDetails.city);
  formData.set("emergency_contact_name",emergencyContactDetails.emergencyContactName);
  formData.set("emergency_contact_no",emergencyContactDetails.emergencyContactNo);
  formData.set("relationship", emergencyContactDetails.relationship);
  formData.set("comments", comments);
  formData.append("form_type", NEW_LOGIN_FORM_ID);
  formData.append("requested_by", localStorage.getItem("outlook_id")); //append the values with key, value pair
  formData.append("requested_on", new Date().getDate);
  formData.append("updated_by", localStorage.getItem("outlook_id"));
  return formData;
}
