import { RETURN_ASSET_FORM_ID } from "../../App/Constants";

//function set up payload object for submitting data. returns all data in a
//single object to post api.
export async function AssetReturnDataSetter(
  datafromAdditionalInfo,
  backup,
  approverData
) {
  const data = {}; //object used to post request. all data is added to this object
  const allRequest = {}; //object to send request details
  allRequest["form_type"] = RETURN_ASSET_FORM_ID;
  allRequest["requested_by"] = localStorage.getItem("outlook_id");
  allRequest["updated_by"] = localStorage.getItem("outlook_id");
  allRequest["reason"] = datafromAdditionalInfo.purpose;
  allRequest["department"] = datafromAdditionalInfo.department;
  allRequest["location"] = datafromAdditionalInfo.location;
  data["return_request"] = allRequest;
  data["return_data"] = backup;
  data["approval_data"] = approverData;
  return data;
}
