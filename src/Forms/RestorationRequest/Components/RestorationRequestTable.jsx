import React from "react";
import "../../RequestTable.css";
import { Button, Form, Table } from "antd";
import { RESTORATION_FORM_COLUMN } from "../../../App/Utils/ColumnMetadata";
import {EditableCell} from "./RestorationEditableCell";
import TablePopConfirm from "../../../App/Utils/TablePopConfirm";
var backup = [];                        //used to store data entered in table.

export const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
export default class EditableTable1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backupof: [],
      data: []
    };
    this.columns = [
     ...RESTORATION_FORM_COLUMN,
      {
        title: "Operation",
        dataIndex: "operation",
        align: "center",
        width: "5%",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <TablePopConfirm
              record = {record.key}
              handleDelete = {this.handleDelete}
            />
          ) : null
      }
    ];
    this.state = {
      dataSource: [
        {
          key: 0
        }
      ],
      count: 1
    };
  }
  handleDelete = (key) => {
    //delete row data
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter((item) => item.key !== key) });
  };
  handleAdd = () => {
    // add new row in the table
    const { count, dataSource } = this.state;
    const newData = {
      key: count
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };
  handleSave = (row) => {
    // here input data (row) from the table is added to the list
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
    backup = Array.from(newData);
    this.props.getTable(backup);
  };
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          inputType: col.dataIndex === "size" ? "number" : "text",
          title: col.title,
          handleSave: this.handleSave,
          typedropdown: this.props.typedropdown
        })
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          size="small"
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          style={{ overflowX: "scroll" }}
        />
        <Button
          onClick={this.handleAdd}
          style={{ marginTop: 16, float: "right" }}
        >
          Add a row
        </Button>
      </div>
    );
  }
}