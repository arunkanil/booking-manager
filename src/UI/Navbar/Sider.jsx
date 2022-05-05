import React from "react";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Layout, Icon, Menu } from "antd";
import { SIDER, SIDER_MENU } from "../../App/Constants";

const { Sider } = Layout;
const { SubMenu } = Menu;
export default class Siderr extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.props.onSiderCollapse(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        className="nbar"
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo"></div>
        <Menu theme="light" mode="vertical">
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="home" />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="subform"
            title={
              <span>
                <Icon type="form" />
                <span>Request forms</span>
              </span>
            }
          >
            {SIDER.map(sider => (
              <Menu.Item key={sider.key}>
                <Link to={sider.link}>{sider.name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
          {SIDER_MENU.map(sider => (
            <Menu.Item key={sider.key}>
              <Link to={sider.link}>
                <Icon type={sider.icon} />
                <span className="nav-text">{sider.name}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}
