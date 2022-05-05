import { RESTORATION,RESTORATION_SUBMIT } from "../../App/Utils/Urls";
import APICommunication from "../../App/Utils/APICommunication";
import { SUCCESS_STATUS_CODE } from "../../App/Constants";

export default class RestorationDataProvider extends APICommunication {
    constructor() {
        super();
        this.APICommunication = new APICommunication();
    }
async fetchDropdownList(){
    const data = await this.APICommunication.getAPI(RESTORATION);
    return data.data.data;
  }
async formSubmit(data) {
    const response = await this.APICommunication.postAPI(RESTORATION_SUBMIT,data);
    if (response.status == parseInt(SUCCESS_STATUS_CODE)) {
        return { result: true, loading: false };
      }
    else {
        return { result: false, loading: false };
    }  
  }
}