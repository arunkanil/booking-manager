import { COMMON_MAILBOX_FORM_ID } from "../../App/Constants";

//function set up payload object for submitting data. returns all data in a
//single object to post api.
export async function commonMailboxDataSetter(
    dataFromDistributionGroup,
    dataFromSharedMailbox,
    dataFromSharedFolder,
    dataFromCommonLoginID,
    datafromAdditionalInfo,
    approverData
) {
    const data = {}; //object used to post request. all data is added to this object
    const submit = {}; //object to send request details
    submit["form_type"] = COMMON_MAILBOX_FORM_ID;
    submit["requested_by"] = localStorage.getItem("outlook_id");
    submit["updated_by"] = localStorage.getItem("outlook_id");

    submit["select_group"] = dataFromDistributionGroup.group;
    submit["group_name"] = dataFromDistributionGroup.groupName;
    submit["group_mail"] = dataFromDistributionGroup.groupEmail;
    submit["add_group_members"] = dataFromDistributionGroup.groupMembers;
    submit["select_group_owner"] = dataFromDistributionGroup.groupOwner;
    submit["require_distribution"] =
        dataFromDistributionGroup.requireDistribution;

    submit["mail_box_name"] = dataFromSharedMailbox.mailboxName;
    submit["mailbox_email_id"] = dataFromSharedMailbox.mailboxEmail;
    submit["mail_box_owner"] = dataFromSharedMailbox.mailboxOwner;
    submit["shared_mailbox"] = dataFromSharedMailbox.sharedMailbox;

    submit["folder_name"] = dataFromSharedFolder.folderName;
    submit["folder_owner"] = dataFromSharedFolder.folderOwner;
    submit["right_to_be_given"] = dataFromSharedFolder.rightsGiven;
    submit["shared_folder"] = dataFromSharedFolder.sharedFolder;

    submit["login_name"] = dataFromCommonLoginID.loginName;
    submit["login_email"] = dataFromCommonLoginID.loginEmail;
    submit["select_login_owner"] = dataFromCommonLoginID.loginOwner;
    submit["required_login"] = dataFromCommonLoginID.requiredLogin;

    submit["department"] = datafromAdditionalInfo.department;
    submit["location"] = datafromAdditionalInfo.location;
    submit["purpose"] = datafromAdditionalInfo.purpose;

    data["submit_data"] = submit;
    data["approval_data"] = approverData;
    return data;
}
