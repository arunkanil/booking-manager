import { NEW_ASSET_FORM_ID } from "../../App/Constants";

//function set up payload object for submitting data. returns all data in a
//single object to post api.
export async function assetRequestDataSetter(
  datafromAdditionalInfo,
  tableData,
  approverData
) {
  const data = {}; //object used to post request. all data is added to this object
  const asset_data = {}; //object to send request details
  asset_data["form_type"] = NEW_ASSET_FORM_ID;
  asset_data["requested_by"] = localStorage.getItem("outlook_id");
  asset_data["updated_by"] = localStorage.getItem("outlook_id");
  asset_data["purpose"] = datafromAdditionalInfo.purpose;
  asset_data["im_no"] = datafromAdditionalInfo.im_no;
  asset_data["department"] = datafromAdditionalInfo.department;
  asset_data["location"] = datafromAdditionalInfo.location;
  data["asset_data"] = asset_data;
  data["additional_data"] = tableData;
  data["approval_data"] = approverData;
  return data;
}
