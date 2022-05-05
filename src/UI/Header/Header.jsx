import React from "react";
import { Layout, Icon, Button } from "antd";
import { APP_TITLE } from "../../App/Constants";
import { Link } from "react-router-dom";
const { Header } = Layout;

export default class FormHeader extends React.Component {
  render() {
    return (
      <Header style={{ background: "#DB0404", padding: 5, height: 65, position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="row">
          <div
            className="col-6 text-left pl-4"
            style={{
              color: "#ECECEC",
              fontSize: "1.0rem",
              fontWeight: "550",
            }}
          >
            {APP_TITLE}
          </div>
          <div className="col-6 text-right" style={{ color: "#ECECEC" }}>
            Welcome <label>{this.props.user}</label> |
            <Link to="/">
              <Button
                type="link"
                className=" mr-2"
                style={{ color: "white" }}
                onClick={this.props.Logout}
              >
                <Icon style={{ verticalAlign: "text-bottom" }} type="logout" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </Header>
    );
  }
}
