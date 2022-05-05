import React from "react";
import { Switch, Route } from "react-router-dom";
import Backup from "../../Forms/BackupRequest/BackupRequest";
import Restoration from "../../Forms/RestorationRequest/RestorationRequest";
import AssetRequest from "../../Forms/NewAssetRequest/AssetRequest";
import Home from "../../Home/Home";
import IdRequest from "../../Forms/FtpIdRequest/FtpIDRequest";
import AssetReturnRequest from "../../Forms/AssetReturnRequest/AssetReturnRequest";
import RiskAcceptance from "../../Forms/RiskAcceptanceForm/RiskAcceptanceForm";
import CommonMailboxRequest from "../../Forms/NewCommonMailboxRequest/NewCommonMailboxRequest";
import NewLoginIDCreation from "../../Forms/NewLoginIdCreation/NewLoginIDCreation";
import MailApproveComments from "../../MailApprove/MailApproveComments";
import MailApprove from "../../MailApprove/MailApprove";
import NotFound from "../Page/NotFound";
import {
  BACKUP_REQUEST_PATH,
  RESTORATION_REQUEST_PATH,
  ASSET_REQUEST_PATH,
  FTPID_REQUEST_PATH,
  ASSET_RETURN_REQUEST_PATH,
  RISK_ACCEPTANCE_PATH,
  COMMONMAILBOX_REQUEST_PATH,
  LOGINID_CREATION_PATH,
  PENDING_REQUEST_PATH,
  PENDING_APPROVAL_PATH,
  APPROVAL_HISTORY_PATH,
  BACKUP_APPROVAL_PATH,
  RESTORATION_APPROVAL_PATH,
  ASSET_APPROVAL_PATH,
  FTP_ID_APPROVAL_PATH,
  COMMONMAILBOX_APPROVAL_PATH,
  ASSET_RETURN_APPROVAL_PATH,
  NEW_LOGIN_ID_APPROVAL_PATH,
  RISK_ACCEPTANCE_APPROVAL_PATH,
  APPROVE_THROUGH_MAIL_PATH,
  APPROVE_THROUGH_MAIL_COMMENTS_PATH,
  REPORT_PATH,
} from "../../App/Utils/Urls";

export default class Router extends React.Component {
  render() {
    return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path={BACKUP_REQUEST_PATH} component={Backup} />
      <Route path={RESTORATION_REQUEST_PATH} component={Restoration} />
      <Route path={ASSET_REQUEST_PATH} component={AssetRequest} />
      <Route path={FTPID_REQUEST_PATH} component={IdRequest} />
      <Route path={ASSET_RETURN_REQUEST_PATH} component={AssetReturnRequest} />
      <Route path={RISK_ACCEPTANCE_PATH} component={RiskAcceptance} />
      <Route path={COMMONMAILBOX_REQUEST_PATH} component={CommonMailboxRequest} />
      <Route path={LOGINID_CREATION_PATH} component={NewLoginIDCreation} />
      <Route path={APPROVE_THROUGH_MAIL_COMMENTS_PATH} component={MailApproveComments} />
      <Route path={APPROVE_THROUGH_MAIL_PATH} component={MailApprove} />
      <Route default component={NotFound}/>
    </Switch>
    )
  }
}
