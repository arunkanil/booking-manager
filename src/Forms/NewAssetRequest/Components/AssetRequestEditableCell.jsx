import React from "react";
import assetRequestDataProvider from "../AssetRequestDataProvider";
import { Form, Input, Select } from "antd";
import { EditableContext } from "./AssetRequestTable";

const { Option } = Select;
var assetType = [];
var requiredType = [];

export default class EditableCell extends React.Component {
  state = {
    editing: false,
    apiManager: []
  };
  constructor(props) {
    super(props);
    this.assetRequestDataProvider = new assetRequestDataProvider();
    this.requestTypeApi = this.requestTypeApi.bind(this);
    this.requiredTypeApi = this.requiredTypeApi.bind(this);
  }
  async requiredTypeApi(value) {
    assetType = await this.assetRequestDataProvider.requiredTypeApi(value);
  }
  async requestTypeApi(value) {
    requiredType = await this.assetRequestDataProvider.requestTypeApi(value);
  }
  async handleSearch(value) {
    //api to search for transfer to
    const response = await this.assetRequestDataProvider.handleSearch(value);
    this.setState({ apiManager: response });
  }

  getInput = (dataIndex, record, requesttypedrop) => {
    //function to render each cell depending on the dataindex of the column
    switch (dataIndex) {
      case "request_type":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="requestType"
            onChange={value => this.requestTypeApi(value)}
          >
            {requesttypedrop.map(person => (
              <Option value={person.id} label={person.name} key={person.id}>
                {person.name}
              </Option>
            ))}
          </Select>
        );
      case "required_type":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="requiredType"
            onChange={value => this.requiredTypeApi(value)}
          >
            {requiredType.map(person => (
              <Option value={person.id} label={person.name} key={person.id}>
                {person.name}
              </Option>
            ))}
          </Select>
        );
      case "asset_type":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="assetType"
          >
            {assetType.map(person => (
              <Option value={person.id} label={person.name} key={person.id}>
                {person.name}
              </Option>
            ))}
          </Select>
        );
      case "from_date":
        return (
          <input
            type="date"
            format="DD-MM-YYYY"
            className="form-control"
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            disabled={record.istemp === true ? false : true}
            onBlur={this.save}
            style={{ height: 40, width: 150 }}
            placeholder="Select"
            name="newAssetSelect"
          />
        );
      case "to_date":
        return (
          <input
            type="date"
            format="DD-MM-YYYY"
            className="form-control"
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            disabled={record.istemp === true ? false : true}
            onBlur={this.save}
            style={{ height: 40, width: 150 }}
            placeholder="Select"
            name="newAssetSelect"
          />
        );
      case "istemp":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="istemp"
          >
            <Option value={true}>Yes </Option>
            <Option value={false}>No </Option>
          </Select>
        );
      case "transfer_to":
        return (
          <Select
            showSearch
            // maxTagCount= {50}
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            disabled={record.request_type === 3 ? false : true}
            placeholder="Type to search"
            name="newAssetSelect"
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
      default:
        return (
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            maxLength={45}
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
      if (record.to_date === undefined) {
        record.to_date = null;
      }
      if (record.from_date === undefined) {
        record.from_date = null;
      }
      if (record.transfer_to === undefined) {
        record.transfer_to = null;
      }
      if (record.remark === undefined) {
        record.remark = null;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };
  renderCell = form => {
    //function to render each cell
    this.form = form;
    const { dataIndex, record, requesttypedrop } = this.props;
    return (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required:
                dataIndex === "remark" ||
                dataIndex === "from_date" ||
                dataIndex === "to_date" ||
                dataIndex === "transfer_to"
                  ? false
                  : true,
              message: `required`
            }
          ],
          initialValue: record[dataIndex]
        })(this.getInput(dataIndex, record, requesttypedrop))}
      </Form.Item>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
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
