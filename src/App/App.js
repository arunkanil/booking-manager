import React from "react";
import Router from "../UI/Routing/Router";
import { Layout, message } from "antd";
import "../index.css";
import "./App.css";
import WrappedLogin from "../Auth/Login"; //login page
import Siderr from "../UI/Navbar/Sider";
import FormHeader from "../UI/Header/Header";
import FormFooter from "../UI/Footer/Footer";
import { MESSAGES } from "./Constants";

const { Content } = Layout;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marginLeft: 0,
      isAuthenticated: sessionStorage.getItem("is_logged_in"),
      user: localStorage.getItem("user"),
    };
    this.setAuth = this.setAuth.bind(this);
    this.Logout = this.Logout.bind(this);
  }
  setAuth(auth) {
    //to set authentication of user. passed as props to login.js
    this.setState({
      isAuthenticated: auth,
      user: localStorage.getItem("user"),
    });
  }
  Logout() {
    // to logout
    localStorage.clear();
    sessionStorage.clear();
    this.setState({ isAuthenticated: "false" });
    message.success(MESSAGES.logout);
  }
  onSiderCollapse = (check) => {
    if (check === true) {
      this.setState({ marginLeft: 80 });
    } else {
      this.setState({ marginLeft: 200 });
    }
  };
  render() {
    if (this.state.isAuthenticated === "true") {
      return (
        <div>
          <Layout>
            {/* <Siderr onSiderCollapse={this.onSiderCollapse} /> side bar component */}
            <Layout
              style={{
                backgroundColor: "white",
                marginLeft: this.state.marginLeft,
              }}
            >
              <FormHeader Logout={this.Logout} user={this.state.user} />
              <Content
                style={{
                  minHeight: "100vh",
                  overflow: "initial",
                }}
              >
                <Router />
              </Content>
              <FormFooter />
            </Layout>
          </Layout>
        </div>
      );
    } else {
      return <WrappedLogin setAuth={this.setAuth} />;
    }
  }
}
export default App;
