import React from "react";
import "../../RequestTable.css";
import { Button, Form, Table } from "antd";
import { API } from "../../../App/Utils/API";
import { FTPID_FORM_COLUMN } from "../../../App/Utils/ColumnMetadata";
import EditableCell from "./FtpIdEditableCell";
import TablePopConfirm from "../../../App/Utils/TablePopConfirm";
var ftpid = [];
API.defaults.headers.common["Authorization"] =
  "Token " + localStorage.getItem("token"); //setting authorisation token

export const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
export default class IDrequesttable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backupof: [],
      data: []
    };
    this.columns = [
      ...FTPID_FORM_COLUMN,
      {
        title: "Action",
        dataIndex: "operation",
        width: 60,
        align: "center",
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
  handleDelete = (key) => {                     //funtion to delete data from table
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  handleAdd = () => {                         // funtion to add row
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
    //function to save data to datasource
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
    ftpid = Array.from(newData);
    this.props.getTable(ftpid); //to send data to main form. received as props
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
          inputType: col.dataIndex === "folder_owner" ? "email" : "text",
          title: col.title,
          handleSave: this.handleSave,
          typeDropdown:this.props.typeDropdown,
          reqTypeDropdown:this.props.reqTypeDropdown
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
          size="small"
          scroll={{ x: 1300 }}
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