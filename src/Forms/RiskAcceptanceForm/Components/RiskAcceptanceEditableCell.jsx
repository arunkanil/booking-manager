import React from "react";
import { Form, Input, Select } from "antd";
import { EditableContext } from "./RiskAcceptanceTable";
const { Option } = Select;

export class EditableCell extends React.Component {
  state = {
    editing: false
  };
  getInput = (dataIndex, exceptionDrop) => {
    //function to render each cell depending on the dataindex of the column
    switch (dataIndex) {
      case "exception_type":
        return (
          <Select
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            name="riskselect"
          >
            {exceptionDrop.map(person => (
              <Option value={person.id} label={person.name} key={person.id}>
                {person.name}
              </Option>
            ))}
          </Select>
        );
      case "from_date":
        return (
          <input
            className="form-control"
            type="date"
            format="YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]"
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            // style={{ height: 40, width: 120 }}
            name="riskselect"
          />
        );
      case "to_date":
        return (
          <input
            className="form-control"
            type="date"
            format="YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]"
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            placeholder="Select"
            // style={{ height: 40, width: 120 }}
            name="riskselect"
          />
        );
      default:
        return (
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            maxLength={50}
            onBlur={this.save}
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
    //to save to datasource
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
    //to render each cell
    this.form = form;
    const { dataIndex, record, exceptionDrop } = this.props;
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
        })(this.getInput(dataIndex, exceptionDrop))}
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
