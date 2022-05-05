import React from "react";
import "../../RequestTable.css";
import { Button, Form, Table } from "antd";
import { EditableCell } from "./AssetReturnEditableCell";
import { RETURN_ASSET_FORM_COLUMN } from "../../../App/Utils/ColumnMetadata";
import TablePopConfirm from "../../../App/Utils/TablePopConfirm";
var backup = []; //to store the data from table

export const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
export default class AssetReturnTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backupof: [],
      data: []
    };

    this.columns = [
      ...RETURN_ASSET_FORM_COLUMN,
      {
        title: "Operation",
        dataIndex: "operation",
        width: "5%",
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
          key: 0
        }
      ],
      count: 1
    };
  }
  handleDelete = (key) => {
    //funtion to delete data from table
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter((item) => item.key !== key) });
  };
  handleAdd = () => {
    // funtion to add row
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
    backup = Array.from(newData);
    this.props.getTable(backup); //to send data to main form. received as props
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
          inputType: col.dataIndex === "assettype" ? "number" : "text",
          title: col.title,
          handleSave: this.handleSave
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
