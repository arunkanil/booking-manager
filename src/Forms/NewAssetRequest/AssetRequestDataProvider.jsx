import {
  ASSETREQUEST,
  ASSET_TABLE_ASSET_TYPE,
  ASSET_TABLE_REQUIRED_TYPE,
  MANAGER_SEARCH,
  NEW_ASSET_SUBMIT
} from "../../App/Utils/Urls";
import APICommunication from "../../App/Utils/APICommunication";
import { SUCCESS_STATUS_CODE } from "../../App/Constants";

export default class assetRequestDataProvider extends APICommunication {
  constructor() {
    super();
    this.APICommunication = new APICommunication();
  }
  async fetchDropdownList() {
    const data = await this.APICommunication.getAPI(ASSETREQUEST);
    return data.data;
  }
  async handleSearch(value) {
    const data = await this.APICommunication.getAPI(MANAGER_SEARCH + value);
    return data.data.Employee_list;
  }
  async requestTypeApi(value) {
    const data = await this.APICommunication.getAPI(
      ASSET_TABLE_REQUIRED_TYPE + value
    );
    return data.data.required_type_list;
  }
  async requiredTypeApi(value) {
    const data = await this.APICommunication.getAPI(
      ASSET_TABLE_ASSET_TYPE + value
    );
    return data.data.asset_type_list;
  }
  async formSubmit(data) {
    const response = await this.APICommunication.postAPI(NEW_ASSET_SUBMIT, data);
    if (response.status == parseInt(SUCCESS_STATUS_CODE)) {
      return { result: true, loading: false };
    } else {
      return { result: false, loading: false };
    }
  }
}
