import React from "react";
import { Popconfirm, Icon } from "antd";

export default class TablePopConfirm extends React.Component {
    render() {
        return (
            <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.props.handleDelete(this.props.record)}
            >
                <a href="javascript:">
                    <Icon
                        type="delete"
                        theme="filled"
                        style={{ color: "#282c34" }}
                    />
                </a>
            </Popconfirm>
        )
    }
}