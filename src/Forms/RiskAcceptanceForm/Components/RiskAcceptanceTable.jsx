import React from "react";
import "../../RequestTable.css";
import { Button, Form, Table } from "antd";
import { RISKACCEPTANCE_FORM_COLUMN } from "../../../App/Utils/ColumnMetadata";
import {EditableCell} from "./RiskAcceptanceEditableCell";
import TablePopConfirm from "../../../App/Utils/TablePopConfirm";
var risk = [];                //to store data entered in table

export const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
export default class RiskAcceptanceTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
     ...RISKACCEPTANCE_FORM_COLUMN,
      {
        title: "Action",
        dataIndex: "operation",
        width: "10%",
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
      exception: [],
      dataSource: [
        {
          key: "0"
        }
      ],
      count: 1
    };
  }
  handleDelete = (key) => {
    //to delete the corrensponding row
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter((item) => item.key !== key) });
  };
  handleAdd = () => {
    //to add a new row
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
    //to save changes to the datasource
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
    risk = Array.from(newData);                       
    this.props.getTable(risk);
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
          title: col.title,
          handleSave: this.handleSave,
          exceptionDrop: this.props.exceptionDrop
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
          dataSource={dataSource}
          columns={columns}
          style={{ x:1300 }}
        />
        <div className="row">
          <div className="col-6 text-left mt-3 text-danger">
            Note:-All exceptions are valid for a maximum duration of 3 months.
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