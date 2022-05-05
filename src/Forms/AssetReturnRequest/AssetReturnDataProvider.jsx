import { ASSETRETURN,RETURN_ASSET_SUBMIT } from "../../App/Utils/Urls";
import APICommunication from "../../App/Utils/APICommunication";
import { SUCCESS_STATUS_CODE } from "../../App/Constants";

export default class AssetReturnDataProvider extends APICommunication {
    constructor() {
        super();
        this.APICommunication = new APICommunication();
    }
async typeDropdownList(){
    const data = await this.APICommunication.getAPI(ASSETRETURN);
    return data.data.data;
  }
async formSubmit(data) {
    const response = await this.APICommunication.postAPI(RETURN_ASSET_SUBMIT,data);
    if (response.status == parseInt(SUCCESS_STATUS_CODE)) {
        return { result: true, loading: false };
      }
    else {
        return { result: false, loading: false };
    }  
  }
}