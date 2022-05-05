import axios from "axios";
import { BASE_URL, APPROVAL_MAIL } from "../App/Utils/Urls";
import { SUCCESS_STATUS_CODE } from "../App/Constants";
import { message } from "antd";

export default class MailApproveDataProvider {
  async approveThroughMail(data) {
    return await axios
      .post(`${BASE_URL}${APPROVAL_MAIL}`, data) //function to approve through mail.
      .then((res) => {
        if (res.status == parseInt(SUCCESS_STATUS_CODE)) {
         return { loading: false, status: true };
        }
      })
      .catch((error) => {
        console.log(error.response);
        message.error(error.response.data.error);
        return { loading: false, status:false };
      });
  }
}
