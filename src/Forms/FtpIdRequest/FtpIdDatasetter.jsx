import { FTP_FORM_ID } from "../../App/Constants";

//function set up payload object for submitting data. returns all data in a
//single object to post api.
export async function FtpIdDataSetter(
  datafromRemarks,
  ftpiddata,
  approverData
) {
  const data = {}; //object used to post request. all data is added to this object
  const allRequest = {}; //object to send request details
  allRequest["form_type"] = FTP_FORM_ID;
  allRequest["requested_by"] = localStorage.getItem("outlook_id");
  allRequest["updated_by"] = localStorage.getItem("outlook_id");
  allRequest["remarks"] = datafromRemarks.remarks;
  data["request"] = allRequest;
  data["details"] = ftpiddata;
  data["hierarchy"] = approverData;
  return data;
}
