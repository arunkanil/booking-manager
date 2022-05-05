import {
  COMMON_MAILBOX_GROUP_DROPDOWN,
  MANAGER_SEARCH,
  COMMON_MAILBOX_SUBMIT
} from "../../App/Utils/Urls";
import APICommunication from "../../App/Utils/APICommunication";
import { SUCCESS_STATUS_CODE } from "../../App/Constants";

export default class CommonMailboxDataProvider extends APICommunication {
  constructor() {
    super();
    this.APICommunication = new APICommunication();
  }
  async fetchDropdownList() {
    const data = await this.APICommunication.getAPI(
      COMMON_MAILBOX_GROUP_DROPDOWN
    );
    return data.data.data;
  }
  async handleSearch(value) {
    const data = await this.APICommunication.getAPI(MANAGER_SEARCH + value);
    return data.data.Employee_list;
  }
  async formSubmit(data) {
    const response = await this.APICommunication.postAPI(
      COMMON_MAILBOX_SUBMIT,
      data
    );
    if (response.status == parseInt(SUCCESS_STATUS_CODE)) {
      return { result: true, loading: false };
    } else {
      return { result: false, loading: false };
    }
  }
}
