import { RISK_ACCEPTANCE,RISK_ACCEPTANCE_SUBMIT } from "../../App/Utils/Urls";
import APICommunication from "../../App/Utils/APICommunication";
import { SUCCESS_STATUS_CODE } from "../../App/Constants";

export default class riskAcceptanceDataProvider extends APICommunication {
    constructor() {
        super();
        this.APICommunication = new APICommunication();
    }
async fetchDropdownList(requestType){
    const data = await this.APICommunication.getAPI(RISK_ACCEPTANCE+requestType);
    return data.data;
  }
async formSubmit(data) {
    const response = await this.APICommunication.postAPI(RISK_ACCEPTANCE_SUBMIT,data);
    if (response.status == parseInt(SUCCESS_STATUS_CODE)) {
        return { result: true, loading: false };
      }
    else {
        return { result: false, loading: false };
    }  
  }
}