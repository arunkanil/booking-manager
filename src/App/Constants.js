import React from "react";
import {
  BACKUP_REQUEST_PATH,
  RESTORATION_REQUEST_PATH,
  FTPID_REQUEST_PATH,
  LOGINID_CREATION_PATH,
  ASSET_REQUEST_PATH,
  COMMONMAILBOX_REQUEST_PATH,
  ASSET_RETURN_REQUEST_PATH,
  RISK_ACCEPTANCE_PATH,
  APPROVAL_HISTORY_PATH,
  PENDING_APPROVAL_PATH,
  PENDING_REQUEST_PATH,
  REPORT_PATH
} from "./Utils/Urls";

export const APP_TITLE = "Seat Booking Manager";
// Form type id's
export const NEW_LOGIN_FORM_ID = "1";
export const BACKUP_FORM_ID = "2";
export const RESTORATION_FORM_ID = "3";
export const FTP_FORM_ID = "4";
export const NEW_ASSET_FORM_ID = "5";
export const COMMON_MAILBOX_FORM_ID = "6";
export const RETURN_ASSET_FORM_ID = "7";
export const RISK_ACCEPTANCE_FORM_ID = "8";

//status
export const PENDING = "0";
export const APPROVED = "1";
export const HIERARCHY_STATUS_REJECTED = "-1";
export const SUCCESS_STATUS_CODE = "201";
export const STATUS_CODE_400 = "400";
export const STATUS_CODE_401 = "401";
export const STATUS_CODE_403 = "403";
export const STATUS_CODE_404 = "404";
export const STATUS_CODE_500 = "500";
export const STATUS_CODE_503 = "503";

//messages
export const ERROR = "Something went wrong";
export const DROPDOWN = {
  search: "Type to  search"
};

export const MESSAGES = {
  approved: "Approved",
  rejected: "Rejected",
  success: "Successfully Placed Request !",
  successDetail:
    "Your request has been sent for Approval, please go to homepage.",
  enterdata: "Enter data in all fields",
  logout: "Logout Successful"
};
export const FORM_HEADINGS = {
  NEW_LOGIN_FORM: "Login ID Creation Request",
  BACKUP_FORM: "Backup Request",
  RESTORATION_FORM: "Backup Restoration Request",
  FTP_FORM: "New FTP ID Request",
  NEW_ASSET_FORM: "New/Upgrade/Transfer/Replace Asset Request",
  COMMON_MAILBOX_FORM: "Common mailbox/Shared folder/Distribution group/Security group Request",
  RETURN_ASSET_FORM: "Return My Asset Request",
  RISK_ACCEPTANCE_FORM: "Risk Acceptance Request"
}
export const FORMS = [
  {
    value: "",
    name: "---select---"
  },
  {
    value: "1",
    name: "Login ID Creation"
  },
  {
    value: "2",
    name: "Backup Request"
  },
  {
    value: "3",
    name: "Backup Restoration Request"
  },
  {
    value: "4",
    name: "FTP ID Request"
  },
  {
    value: "5",
    name: "New Asset Request"
  },
  {
    value: "6",
    name: "New Common Mailbox Request"
  },
  {
    value: "7",
    name: "Return Asset Request"
  },
  {
    value: "8",
    name: "Risk Acceptance Request"
  },
  {
    value: "10",
    name: "Resignation Clearance Request"
  }
];
// eslint-disable-next-line no-useless-escape
export const IM_PLACEHOLDER = "IMxxxxxx";
export const COMMENT_PLACEHOLDER = "Enter Comments Here";
export const PHONE_MAXLENGTH = 10;

export const PATTERNS = {
  EMAIL: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
  PHONE: "[0-9]{10}",
  IM: "[IM]+[0-9]{3,10}",
  LOGIN_NAME: "[A-Za-z0-9]{3,15}",
  SERVER_IP: "^([0-9]{1,3}.){3}[0-9]{1,3}$"
};

export const STATUS = [
  {
    value: "",
    name: "---select---"
  },
  {
    value: "1",
    name: "Approved"
  },
  {
    value: "0",
    name: "Pending"
  },
  {
    value: "-1",
    name: "Rejected"
  }
];

export const SIDER = [
  {
    key: "2",
    link: BACKUP_REQUEST_PATH,
    name: "Backup request form"
  },
  {
    key: "3",
    link: RESTORATION_REQUEST_PATH,
    name: "Restoration request form"
  },
  {
    key: "4",
    link: FTPID_REQUEST_PATH,
    name: "New FTP ID creation form"
  },
  {
    key: "5",
    link: LOGINID_CREATION_PATH,
    name: "Login ID creation form"
  },
  {
    key: "6",
    link: ASSET_REQUEST_PATH,
    name: "New/Upgrade/Transfer/Replace Asset request form"
  },
  {
    key: "7",
    link: COMMONMAILBOX_REQUEST_PATH,
    name:
      "New/ Common mail box/ Login/ Shared folder/ Distributiongroup/ Security group request form"
  },
  {
    key: "8",
    link: ASSET_RETURN_REQUEST_PATH,
    name: "Return My Asset request form"
  },
  {
    key: "9",
    link: RISK_ACCEPTANCE_PATH,
    name: "Risk acceptance form"
  }
];
export const SIDER_MENU = [
  {
    key: "11",
    icon: "bar-chart",
    link: REPORT_PATH,
    name: "Reports"
  },
  {
    key: "12",
    icon: "project",
    link: PENDING_REQUEST_PATH,
    name: "My requests"
  },
  {
    key: "13",
    icon: "project",
    link: PENDING_APPROVAL_PATH,
    name: "Pending approvals"
  },
  {
    key: "14",
    icon: "history",
    link: APPROVAL_HISTORY_PATH,
    name: "Approval history"
  }
];
export const LOGIN_ID_APPROVAL_STATE = {
  request: [],
  details: [],
  hierarchy: [],
  empname: "",
  emptype: "",
  sapcode: "",
  loginrequired: "",
  fromdate: "",
  accessidtemporary: "",
  todate: "",
  accessidrequired: "",
  sbu: "",
  department: "",
  company: "",
  managername: "",
  designation: "",
  manageremail: "",
  mobilenum: "",
  dateofjoining: "",
  alternatenum: "",
  voip: "",
  group: "",
  street: "",
  city: "",
  state: "",
  country: "",
  zip: "",
  emname: "",
  relationship: "",
  emcontact: "",
  comments: "",
  approver1: "",
  photo: "",
  status: "",
  comment: "",
  outlookId: "",
  loading: true
};

export const RISK_ACCEPTANCE_TEXT = (
  <div>
    Note:-
  <br />
    <b>1) Financial Exposure:</b>
    <br />
    User can disclose confidential data to unauthorised person that would
    directly or indirectly impact on Essar finance
  <br />
    <b>2) Legal/Compliance Liability:</b>
    <br />
    Disclosure of data which will directly effect on how the organization
    complies with statutory obligations.
  <br />
    Like user can install pirated software on Essar asset. User can send
    client's confidential data to unauthorised person.
  <br />
    <b>3)Reputation Loss:</b>
    <br />
    Certain information data could be put to malicious use by
    journalists,activists,alienated customers or employees.
  <br />
    The intent in such cases could be to hurt the confidentiality,integrity
    and availability of data that build brand value.
  <br />
    <b>4)Value to Competition:</b>
    <br />
    Loss of certain data to a competitor could put the organization to a
    competitive disadvantage over a period of time.
  <br />
    This loss could undermine the company's market position and share.
  </div>
)