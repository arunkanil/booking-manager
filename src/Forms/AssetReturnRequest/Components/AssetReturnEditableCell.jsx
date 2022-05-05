import React from "react";
import { Form, Input, Select } from "antd";
import { EditableContext } from "./AssetReturnRequestTable";
import AssetReturnDataProvider from "../AssetReturnDataProvider";

const { Option } = Select;
var typeDropdown = [];
export class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.AssetReturnDataProvider = new AssetReturnDataProvider();
  }
  state = {
    editing: false
  };
  async componentDidMount() {
    typeDropdown = await this.AssetReturnDataProvider.typeDropdownList();
  }
  getInput = dataIndex => {
    //function to render each cell depending on the dataindex of the column
    switch (dataIndex) {
      case "asset":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="asset"
          >
            {typeDropdown.map(person => (
              <Option value={person.id} label={person.name} key={person.id}>
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
            maxLength={80}
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
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };
  renderCell = form => {
    //function to render each cell
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
