import { API } from "./API";
import { errorMessages } from "./ErrorMessages";
import { message } from "antd";
import axios from "axios";

export default class APICommunication {
  async getAPI(address) {
    return await API.get(`${address}`)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        errorMessages(error);
      });
  }
  async postAPI(address, data) {
    return await API.post(`${address}`, data)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        errorMessages(error);
        return error;
      });
  }
  async postAPICustomMessage(address, data) {
    return await API.post(`${address}`, data)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        message.error(error.response.data.error);
        return false
      });
  }
  async postAPIFileUpload(address, data) {
    return await API.post(`${address}`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        errorMessages(error);
        return error;
      });
  }
  async postAxios(address, data) {
    return await axios.post(`${address}`, data)
      .then(response => {
        return response;
      })
      .catch((error) => {
        if (error.response === undefined) {
          message.error("Unable to connect. Please check your connection!");
          return false
        }
        else {
          console.log(error.response.data.message,'error');
          message.error(error.response.data.message);
          return false
        }
      });
  }
}
