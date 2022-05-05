import React from "react";
import { Upload, Button, Icon, message } from "antd";

var uploadfile=null;
export default class Attachments extends React.Component {
  componentDidUpdate() {
    this.props.getDataFromAttachments(uploadfile);
  }
  photoUpload = (file, onSuccess) => {
    //funtion to append image to formData
    uploadfile=file;
  }
  onChangeUpload = (info) => {
    //to show status of uploading
    const status = info.file.status;
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } 
  };

  beforeUpload = (file) => {
    // funtion to check the file parameters before uploading
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 < 50;
    if (!isLt2M) {
      message.error("Image must smaller than 50 KB!");
    }
    return isJpgOrPng && isLt2M;
  }
  render() {
    return (
      <div className="row input">
        <div className="container">
          <h4 className=" pt-3">Attachments</h4>
          <hr />
          <div className="row input">
            <div className="col-2 pt-3">Upload Employee Photo</div>
            <div className="col-6 pt-3">
              <Upload
                name="user_image"
                multiple={false}
                accept=".jpg, .jpeg, .png"
                beforeUpload={this.beforeUpload}
                action={this.photoUpload}
                onChange={this.onChangeUpload}
              >
                <Button placeholder="jpeg, jpg, png only">
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-12">
              Note:- File format should be jpeg, jpg, png. Maximum size 50KB.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
