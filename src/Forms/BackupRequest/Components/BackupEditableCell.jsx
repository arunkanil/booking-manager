import React from "react";
import { Form, Input, InputNumber, Select } from "antd";
import { PATTERNS } from "../../../App/Constants";
import BackupRequestDataProvider from "../BackupRequestDataProvider";
import { EditableContext } from "./BackupRequestTable";

const { Option } = Select;
var backupList = [];
var serverTypeList = [];
var frequencyList = [];
var backupDriveList = [];

export class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.BackupRequestDataProvider = new BackupRequestDataProvider();
  }
  state = {
    editing: false
  };
  async componentDidMount() {
    const data = await this.BackupRequestDataProvider.fetchDropdownList(); //api to populate dropdowns.
    backupList = data.backup_of_list;
    serverTypeList = data.server_type_list;
    frequencyList = data.frequency_list;
    backupDriveList = data.backup_drive;
  }
  //get input from table
  getInput = dataIndex => {
    //function to render component conditionally based on dataindex. dataindex
    switch (
      dataIndex //is the argument. also returns text field as default.
    ) {
      case "backup_of":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="backupselect"
          >
            {backupList.map(person => (
              <Option value={person.id} label={person.name} key={person.id}>
                {person.name}
              </Option>
            ))}
          </Select>
        );
      case "server_ip":
        return (
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            required={true}
            pattern={PATTERNS.SERVER_IP}
            placeholder="Enter server IP"
          />
        );
      case "server_type":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="backupselect"
          >
            {serverTypeList.map(serverType => (
              <Option
                value={serverType.id}
                label={serverType.name}
                key={serverType.id}
              >
                {serverType.name}
              </Option>
            ))}
          </Select>
        );
      case "frequency":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="backupselect"
          >
            {frequencyList.map(person => (
              <Option value={person.id} label={person.name} key={person.id}>
                {person.name}
              </Option>
            ))}
          </Select>
        );
      case "backup_drive":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="backupselect"
          >
            {backupDriveList.map(person => (
              <Option value={person.id} label={person.name} key={person.id}>
                {person.name}
              </Option>
            ))}
          </Select>
        );
      case "size":
        return (
          <InputNumber
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            required={true}
            onBlur={this.save}
            placeholder="add size"
            min={0}
          />
        );
      default:
        return (
          <Input
            type="text"
            maxLength={75}
            required={true}
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="max 75 characters"
          />
        );
    }
  };
  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };
  // here input data (row) from the table is added to the list
  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };
  renderCell = form => {
    //function to render each cell. form is argument.
    this.form = form;
    const { dataIndex, record } = this.props;
    return (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `required`
            }
          ],
          initialValue: record[dataIndex]
        })(this.getInput(dataIndex))}
      </Form.Item>
    );
  };

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
