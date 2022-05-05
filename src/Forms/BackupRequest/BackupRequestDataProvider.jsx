import { BACKUP_REQUEST_DROPDOWN,SUBMIT_BACKUP_DETAILS } from "../../App/Utils/Urls";
import APICommunication from "../../App/Utils/APICommunication";
import { SUCCESS_STATUS_CODE } from "../../App/Constants";

export default class BackupRequestDataProvider extends APICommunication {
    constructor() {
        super();
        this.APICommunication = new APICommunication();
    }
async fetchDropdownList(){
    const data = await this.APICommunication.getAPI(BACKUP_REQUEST_DROPDOWN);
    return data.data;
  }
async formSubmit(data) {
    const response = await this.APICommunication.postAPI(SUBMIT_BACKUP_DETAILS,data);
    if (response.status == parseInt(SUCCESS_STATUS_CODE)) {
        return { result: true, loading: false };
      }
    else {
        return { result: false, loading: false };
    }  
  }
}