import React from "react";
import { Tag } from "antd";

export const NEW_ASSET_APPROVAL_COLUMN = [
  {
    title: "Request Type",
    dataIndex: "requesttype"
  },
  {
    title: "Required Type",
    dataIndex: "requiredtype"
  },
  {
    title: "Asset Type",
    dataIndex: "assettype"
  },
  {
    title: "Remarks",
    dataIndex: "remarks"
  },
  {
    title: "Is Temp",
    dataIndex: "istemp"
  },
  {
    title: "From Date",
    dataIndex: "fromdate"
  },
  {
    title: "To Date",
    dataIndex: "todate"
  },
  {
    title: "Transfer To",
    dataIndex: "transferto"
  }
];

//back up Approval
export const BACKUP_APPROVAL_COLUMN = [
  {
    title: "Backup Of",
    dataIndex: "backup_of"
  },
  {
    title: "Server IP",
    dataIndex: "server_ip"
  },
  {
    title: "Server Type",
    dataIndex: "server_type"
  },
  {
    title: "Frequency",
    dataIndex: "frequency"
  },
  {
    title: "Backup Drive",
    dataIndex: "backup_drive"
  },
  {
    title: "Size",
    dataIndex: "size"
  },
  {
    title: "Path",
    dataIndex: "path"
  }
];

//return acceptance Approval
export const RETURN_ACCEPTANCE_APPROVAL_COLUMN = [
  {
    title: "Exception Type",
    dataIndex: "exception_type",
    align: "center",
    width: "25%"
  },
  {
    title: "From Date",
    dataIndex: "from_date",
    align: "center"
  },
  {
    title: "To Date",
    dataIndex: "to_date",
    align: "center"
  },
  {
    title: "Justify",
    dataIndex: "justify",
    width: "40%",
    align: "center"
  }
];

//return asset Approval

export const RETURN_ASSET_APPROVAL_COLUMN = [
  {
    title: "Asset",
    dataIndex: "asset",
    align: "center"
  },
  {
    title: "Details",
    dataIndex: "details",
    align: "center"
  },
  {
    title: "Reason",
    dataIndex: "reason",
    align: "center"
  }
];

//restoration Approval column

export const RESTORATION_APPROVAL_COLUMN = [
  {
    title: "File Type",
    dataIndex: "type"
  },
  {
    title: "Full Path",
    dataIndex: "full_path"
  },
  {
    title: "Reason",
    dataIndex: "reason"
  },
  {
    title: "Deleted Date",
    dataIndex: "corrupted_dt"
  },
  {
    title: "Last Accessed Date",
    dataIndex: "lst_accessed_dt"
  }
];

// new login id Approval

export const NEW_LOGIN_ID_APPROVAL_COLUMN = [
  {
    title: "Type",
    dataIndex: "type"
  },
  {
    title: "Requirement Type",
    dataIndex: "req_type"
  },
  {
    title: "FTP User ID",
    dataIndex: "ftp_uid"
  },
  {
    title: "Folder Name",
    dataIndex: "folder_name"
  },
  {
    title: "Validity From",
    dataIndex: "validity_from"
  },
  {
    title: "Validity To",
    dataIndex: "validity_to"
  },
  {
    title: "Reason",
    dataIndex: "reason"
  },
  {
    title: "Folder Owner",
    dataIndex: "folder_owner"
  }
];

export const RETURN_ASSET_FORM_COLUMN = [
  {
    title: "Asset",
    dataIndex: "asset",
    align: "center",
    width: "25%",
    editable: true
  },
  {
    title: "Details",
    dataIndex: "details",
    align: "center",
    editable: true
  },
  {
    title: "Reason",
    dataIndex: "reason",
    align: "center",
    editable: true
  }
];
export const BACKUP_FORM_COLUMN = [
  {
    title: "Backup Of",
    dataIndex: "backup_of",
    align: "center",
    editable: true,
    width: "15%"
  },
  {
    title: "Server IP",
    dataIndex: "server_ip",
    align: "center",
    editable: true,
    dataType: "number"
  },
  {
    title: "Server Type",
    dataIndex: "server_type",
    align: "center",
    editable: true,
    width: "15%"
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    align: "center",
    editable: true,
    width: "10%"
  },
  {
    title: "Backup Drive",
    dataIndex: "backup_drive",
    align: "center",
    editable: true
  },
  {
    title: "Size(in MB)",
    dataIndex: "size",
    align: "center",
    editable: true
  },
  {
    title: "Path",
    dataIndex: "path",
    align: "center",
    editable: true
  }
];
export const FTPID_FORM_COLUMN = [
  {
    title: "Type",
    dataIndex: "type",
    align: "center",
    width: 180,
    editable: true
  },
  {
    title: "Requirement Type",
    dataIndex: "req_type",
    align: "center",
    width: 150,
    editable: true
  },
  {
    title: "FTP User ID",
    dataIndex: "ftp_uid",
    align: "center",
    width: 180,
    editable: true
  },
  {
    title: "Folder Name",
    dataIndex: "folder_name",
    align: "center",
    width: 180,
    editable: true
  },
  {
    title: "Folder Owner",
    dataIndex: "folder_owner",
    align: "center",
    width: 230,
    editable: true
  },
  {
    title: "Validity From",
    dataIndex: "validity_from",
    align: "center",
    width: 170,
    editable: true
  },
  {
    title: "Validity To",
    dataIndex: "validity_to",
    align: "center",
    width: 170,
    editable: true
  },
  {
    title: "Reason",
    dataIndex: "reason",
    align: "center",
    width: 230,
    editable: true
  }
];
export const ASSET_FORM_COLUMN = [
  {
    title: "Request Type",
    dataIndex: "request_type",
    align: "center",
    width: 120,
    editable: true
  },
  {
    title: "Required Type",
    dataIndex: "required_type",
    align: "center",
    width: 120,
    editable: true
  },
  {
    title: "Asset Type",
    dataIndex: "asset_type",
    align: "center",
    width: 200,
    editable: true
  },
  {
    title: "Remarks",
    dataIndex: "remark",
    align: "center",
    //width: '20%',
    editable: true
  },
  {
    title: "Is Temp",
    dataIndex: "istemp",
    align: "center",
    width: 70,
    editable: true
  },
  {
    title: "From Date",
    dataIndex: "from_date",
    align: "center",
    editable: true
  },
  {
    title: "To Date",
    dataIndex: "to_date",
    align: "center",
    editable: true
  },
  {
    title: "Transfer To",
    dataIndex: "transfer_to",
    align: "center",
    width: 200,
    editable: true
  }
];
export const RESTORATION_FORM_COLUMN = [
  {
    title: "Type",
    dataIndex: "type",
    align: "center",
    width: "10%",
    editable: true
  },
  {
    title: "Full Path",
    dataIndex: "full_path",
    align: "center",
    editable: true
  },
  {
    title: "Reason",
    dataIndex: "reason",
    align: "center",
    editable: true
  },
  {
    title: "Corrupted/Deleted Date",
    dataIndex: "corrupted_dt",
    align: "center",
    width: "15%",
    editable: true
  },
  {
    title: "Last Accessed Date",
    dataIndex: "lst_accessed_dt",
    align: "center",
    width: "15%",
    editable: true
  }
];
export const RISKACCEPTANCE_FORM_COLUMN = [
  {
    title: "Exception Type",
    dataIndex: "exception_type",
    align: "center",
    width: "25%",
    editable: true
  },
  {
    title: "From Date",
    dataIndex: "from_date",
    align: "center",
    editable: true
  },
  {
    title: "To Date",
    dataIndex: "to_date",
    align: "center",
    editable: true
  },
  {
    title: "Justify",
    dataIndex: "justify",
    width: "40%",
    editable: true,
    align: "center"
  }
];
export const APPROVAL_HISTORY_COLUMN = [
  {
    headerName: "Request No.",
    field: "req_num",
    cellRenderer: "linkRenderer",
    cellRendererParams: {
      request : "form_type",
      type : "history",
    }
  },
  {
    headerName: "Date",
    field: "req_date",
  },
  {
    headerName: "Request",
    field: "request",
  },
  {
    headerName: "Requestor Name",
    field: "requestorName",
  },
  {
    headerName: "Status",
    field: "tags",
    cellRenderer: "statusRenderer"
  }
];
export const PENDING_APPROVAL_COLUMN = [
  {
    headerName: "Request No.",
    field: "req_num",
    cellRenderer: "linkRenderer",
    cellRendererParams: {
      request : "form_type",
      type : "approval",
    }
  },
  {
    headerName: "Date",
    field: "req_date",
  },
  {
    headerName: "Request",
    field: "request",
  },
  {
    headerName: "Requestor Name",
    field: "requestorName",
  },
  {
    headerName: "Status",
    field: "tags",
    cellRenderer: "statusRenderer"
  }
];
export const PENDING_CLEARANCE_COLUMN = [
  {
    headerName: "Date",
    field: "updated_on",
  },
  {
    headerName: "Clearance From",
    field: "clearance_from",
    width: 400,
  },
  {
    headerName: "Request",
    field: "clearance_type",
  },
  {
    headerName: "Status",
    field: "status",
    cellRenderer: "statusRenderer"
  }
];
export const PENDING_REQUEST_COLUMN = [
  {
    headerName: "Request No.",
    field: "req_num",
    cellRenderer: "linkRenderer",
    cellRendererParams: {
      request : "form_type",
      type : "request",
    }
  },
  {
    headerName: "Date",
    field: "req_date",
  },
  {
    headerName: "Request",
    field: "request",
    width: 400,
  },
  {
    headerName: "Status",
    field: "tags",
    cellRenderer: "statusRenderer"
  }
];
export const REPORT_COLUMN = [
  {
    headerName: "Request No.",
    field: "request_no",
  },
  {
    headerName: "Date",
    field: "requested_on",
    cellRenderer: "dateRenderer"
  },
  {
    headerName: "Requestor Name",
    field: "requested_by",
  },
  {
    headerName: "Request",
    field: "form_name",
  },
  {
    headerName: "Status",
    field: "status",
    cellRenderer: "statusRenderer"
  }
];
