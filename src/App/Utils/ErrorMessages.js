import { message } from "antd";
import { STATUS_CODE_400,STATUS_CODE_401,STATUS_CODE_403,STATUS_CODE_404,STATUS_CODE_500,STATUS_CODE_503 } from "../Constants";


export function errorMessages(error) {
  console.log(error.response,"error");
  if (error.response === undefined) {
    message.error("Unable to connect. Please check your connection!");
  } else {
    if (error.response.status === parseInt(STATUS_CODE_400)) {
      message.error("Please check all the fields!");
    }
    else if (error.response.status === parseInt(STATUS_CODE_401)) {
      message.error("You are not authorized. Please log out and try again!");
    } else if (error.response.status === parseInt(STATUS_CODE_403)) {
      message.error(
        "You do not have permission to access the requested resource..!"
      );
    } else if (error.response.status === parseInt(STATUS_CODE_404)) {
      message.error("The requested resource was not found.!");
    } else if (error.response.status === parseInt(STATUS_CODE_500)) {
      message.error("Internal server error!");
    } else if (error.response.status === parseInt(STATUS_CODE_503)) {
      message.error("The server is unavailable!");
    }
  }
}
