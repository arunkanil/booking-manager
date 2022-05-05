import { RISK_ACCEPTANCE_FORM_ID } from "../../App/Constants";

//function set up payload object for submitting data. returns all data in a
//single object to post api.
export async function riskAcceptanceDataSetter(
  datafromAdditionalInfo,
  dataFromRiskType,
  risk,
  networkForm,
  approverData
) {
  const data = {}; //object send as payload in api call
  const allRequest = {}; //object to store details except table
  allRequest["form_type"] = RISK_ACCEPTANCE_FORM_ID;
  allRequest["requested_by"] = localStorage.getItem("outlook_id");
  allRequest["updated_by"] = localStorage.getItem("outlook_id");
  allRequest["remarks_justification"] = datafromAdditionalInfo.purpose;
  allRequest["department"] = datafromAdditionalInfo.department;
  allRequest["location"] = datafromAdditionalInfo.location;
  allRequest["asset_number"] = dataFromRiskType.assetNumber;
  allRequest["risk_type"] = dataFromRiskType.riskType;
  allRequest["network_form"] = networkForm;
  data["risk_acceptance"] = allRequest;
  data["exception_data"] = risk;
  data["approval_data"] = approverData;
  return data;
}
