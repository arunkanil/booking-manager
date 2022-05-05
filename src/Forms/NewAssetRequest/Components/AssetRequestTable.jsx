import React from "react";
import "../../RequestTable.css";
import { Button, Form, Table } from "antd";
import { API } from "../../../App/Utils/API";
import { ASSET_FORM_COLUMN } from "../../../App/Utils/ColumnMetadata";
import EditableCell from "./AssetRequestEditableCell";
import TablePopConfirm from "../../../App/Utils/TablePopConfirm";

var tableData = [];
API.defaults.headers.common["Authorization"] =
  "Token " + localStorage.getItem("token"); //setting token authorisation

export const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.columns = [
      ...ASSET_FORM_COLUMN,
      {
        title: "Action",
        dataIndex: "operation",
        align: "center",
        width: 60,
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
          key: "0"
        }
      ],
      count: 1
    };
  }
  //delete row data
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  // add new row in the table
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };
  // here input data (row) from the table is added to the list
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
    tableData = Array.from(newData);
    this.props.getTable(tableData);
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          requesttypedrop: this.props.requesttypedrop
        })
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 1300 }}
          size="small"
        />
        <div className="row">
          <div className="col-6 text-left mt-3">
            Note:-Please scroll the table and fill all fields.
          </div>
          <div className="col-6">
            <Button
              onClick={this.handleAdd}
              style={{ marginTop: 16, float: "right" }}
            >
              Add a row
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
