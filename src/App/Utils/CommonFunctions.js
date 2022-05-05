import { API } from "./API";
import {
  APPROVAL_API,
  OUTLOOK_ID,
  GET_DEPT_LOC_LIST,
  APPROVE_REJECT,
  BASE_URL,
  APPROVAL_MAIL
} from "./Urls";
import {
  MESSAGES,
  ERROR,
  SUCCESS_STATUS_CODE
} from "../Constants";
import { message } from "antd";
import {
  NEW_LOGIN_FORM_ID,
  BACKUP_FORM_ID,
  RESTORATION_FORM_ID,
  FTP_FORM_ID,
  NEW_ASSET_FORM_ID,
  COMMON_MAILBOX_FORM_ID,
  RETURN_ASSET_FORM_ID,
  RISK_ACCEPTANCE_FORM_ID
} from "../Constants";
import axios from "axios";
import { errorMessages } from "./ErrorMessages";

/**
 * return approvers list  according to  each request id
 * @param {*} value
 */
//api to populate fields in Approval list of all request Forms
export async function approverAPI(value) {
  API.defaults.headers.common["Authorization"] =
    "Token " + localStorage.getItem("token");
  return await API.get(
    // fetch approver list
    `${APPROVAL_API}${value}${OUTLOOK_ID}${localStorage.getItem("outlook_id")}`
  )
    .then((res) => {
      let data = res.data.hierarchy;
      return data;
    })
    .catch((error) => {
      let data = null;
      console.log(error);
      errorMessages(error);
      return data;
    });
}

//api to get  department List and location List
// function will return dept and location list
export async function deptLocListAPI() {
  API.defaults.headers.common["Authorization"] =
    "Token " + localStorage.getItem("token");
  return await API.get(`${GET_DEPT_LOC_LIST}`)
    .then((res) => {
      let data = res.data;
      return data;
    })
    .catch((error) => {
      console.log(error);
      errorMessages(error);
    });
}

/**
 *
 * return appropriate url as string
 * here we get formtype,val and type id as param
 * checking formtype with constants and return the url
 * @param {*} formType
 * @param {*} val
 * @param {*} type
 */
export function navigateTo(formType, val, type) {
  // navigate to  appropriate request

  switch (String(formType)) {
    case NEW_LOGIN_FORM_ID:
      return `/approval_new_login_id/${val}/${type}`;
    case BACKUP_FORM_ID:
      return `/approval_backup/${val}/${type}`;
    case RESTORATION_FORM_ID:
      return `/approval_restoration/${val}/${type}`;
    case FTP_FORM_ID:
      return `/approval_ftp_id/${val}/${type}`;
    case NEW_ASSET_FORM_ID:
      return `/approval_asset/${val}/${type}`;
    case COMMON_MAILBOX_FORM_ID:
      return `/approval_common_mailbox/${val}/${type}`;
    case RETURN_ASSET_FORM_ID:
      return `/approval_asset_return/${val}/${type}`;
    case RISK_ACCEPTANCE_FORM_ID:
      return `/approval_risk_acceptance/${val}/${type}`;
    default:
      message.error(ERROR);
      return null;
  }
}

/**
 * approve  or  reject the request
 * here we get status,comment,id and outlook id as param
 * creating an object data and post this data  to  approve or reject the request
 * @param {*} status
 */
export async function approveReject(status, comment, id, outlookId) {
  const data = {};
  data["comment"] = comment;
  data["req_no"] = parseInt(id);
  data["outlook_id"] = outlookId;
  data["status"] = status;
  return await API.post(`${APPROVE_REJECT}`, data)
    .then((res) => {
      if (res.status === 201) {
        if (status === true) {
          message.success(MESSAGES.approved);
        } else {
          this.props.history.push("/");
          message.success(MESSAGES.rejected);
        }
      }
      return res.status;
    })
    .catch((error) => {
      errorMessages(error);
    });
}

export async function apiSubmit(api, data) {
  return await API.post(`${api}`, data)
    .then((res) => {
      if (res.status == parseInt(SUCCESS_STATUS_CODE)) {
        return { result: true, loading: false };
      }
    })
    .catch((error) => {
      errorMessages(error);
      return { result: false, loading: false };
    });
}

