import React from "react";
import {Form, Input, Select} from "antd";
import {EditableContext} from "./RestorationRequestTable";
const { Option } = Select;

export class EditableCell extends React.Component {
    state = {
        editing: false
    };
    getInput = (dataIndex,typedropdown) => {         //function to render each cell depending on the dataindex of the column
        switch (dataIndex) {
            case "type":
                return (
                    <Select
                        ref={(node) => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                        placeholder="Select"
                        name="restorationselect"
                    >
                        {typedropdown.map((person) => (
                            <Option value={person.id} label={person.name} key={person.id}>
                                {person.name}
                            </Option>
                        ))}
                    </Select>
                );
            case "corrupted_dt":
                return (
                    <input
                        type="date"
                        format="DD-MM-YYYY"
                        className="form-control"
                        required
                        ref={(node) => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                        placeholder="Select"
                        style={{ height: 40, width: 150 }}
                        name="restorationselect"
                    />
                );
            case "lst_accessed_dt":
                return (
                    <input
                        type="date"
                        className="form-control"
                        format="DD-MM-YYYY"
                        required
                        ref={(node) => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                        placeholder="Select"
                        style={{ height: 40, width: 150 }}
                        name="restorationselect"
                    />
                );
            default:
                return (
                    <Input
                        type="text"
                        ref={(node) => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                        required
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
    save = (e) => {
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
    renderCell = (form) => {
        //function to render each cell
        this.form = form;
        const { dataIndex, record ,typedropdown } = this.props;
        // const { editing } = this.state;
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
                })(this.getInput(dataIndex,typedropdown))}
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