import APICommunication from "../App/Utils/APICommunication";
import { BASE_URL, LOGIN } from "../App/Utils/Urls";

export default class LoginDataProvider extends APICommunication {
    constructor() {
        super();
        this.APICommunication = new APICommunication();
    }
async formSubmit(data) {
    const response = await this.APICommunication.postAxios(BASE_URL+LOGIN,data);
    if (response)
    return response;
  }
}