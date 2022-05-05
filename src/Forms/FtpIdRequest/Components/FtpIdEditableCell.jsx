import React from "react";
import { Form, Input, Select } from "antd";
import { EditableContext } from "./FtpIDRequestTable";
import FtpIdDataProvider from "../FtpIdDataProvider";
const { Option } = Select;

export default class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.FtpIdDataProvider = new FtpIdDataProvider();
  }
  state = {
    editing: false,
    apiManager: []
  };
  getInput = (dataIndex, record, typeDropdown, reqTypeDropdown) => {
    //function to render each cell depending on the dataindex of the column
    switch (dataIndex) {
      case "type":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="ftpidselect"
          >
            {typeDropdown.map(person => (
              <Option value={person.name} label={person.name} key={person.name}>
                {person.name}
              </Option>
            ))}
          </Select>
        );
      case "req_type":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="ftpidselect"
          >
            {reqTypeDropdown.map(person => (
              <Option value={person.name} label={person.name} key={person.id}>
                {person.name}
              </Option>
            ))}
          </Select>
        );
      case "validity_from":
        return (
          <input
            type="date"
            format="DD-MM-YYYY"
            className="form-control"
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            disabled={record.req_type == "Permanant" ? true : false}
            style={{ height: 40, width: 150 }}
            name="ftpidselect"
          />
        );
      case "validity_to":
        return (
          <input
            type="date"
            format="DD-MM-YYYY"
            className="form-control"
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            disabled={record.req_type == "Permanant" ? true : false}
            style={{ height: 40, width: 150 }}
            name="ftpidselect"
          />
        );
      case "folder_owner":
        return (
          <Select
            showSearch
            maxTagCount="50"
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Type to search"
            name="ftpidselect"
            onSearch={value => {
              this.handleSearch(value);
            }}
          >
            {this.state.apiManager.map(person => (
              <Option value={person.name} label={person.name} key={person.name}>
                {person.name}
              </Option>
            ))}
          </Select>
        );
      case "ftp_uid":
        return (
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            maxLength={150}
            onBlur={this.save}
            disabled={record.type == "Folder Name" ? true : false}
            placeholder="add data"
          />
        );
      case "folder_name":
        return (
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            maxLength={25}
            disabled={record.type == "FTP ID" ? true : false}
            placeholder="add data"
          />
        );
      default:
        return (
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            maxLength={100}
            placeholder="add data"
          />
        );
    }
  };
  toggleEdit = () => {
    //to toggle the editing status
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };
  save = e => {
    //calls handlesave to splice and save data
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      if (record.validity_from === undefined) {
        record.validity_from = null;
      }
      if (record.validity_to === undefined) {
        record.validity_to = null;
      }
      if (record.ftp_uid === undefined) {
        record.ftp_uid = "";
      }
      if (record.folder_name === undefined) {
        record.folder_name = "";
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };
  renderCell = form => {
    //function to render each cell
    this.form = form;
    const { dataIndex, record, typeDropdown, reqTypeDropdown } = this.props;
    return (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required:
                dataIndex == "validity_from" ||
                dataIndex == "validity_to" ||
                dataIndex == "ftp_uid" ||
                dataIndex == "folder_name"
                  ? false
                  : true,
              message: `required`
            }
          ],
          initialValue: record[dataIndex]
        })(this.getInput(dataIndex, record, typeDropdown, reqTypeDropdown))}
      </Form.Item>
    );
  };
  async handleSearch(value) {
    const response = await this.FtpIdDataProvider.handleSearch(value);
    //api to search for folder owner
    this.setState({ apiManager: response });
  }
  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      inputType,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
