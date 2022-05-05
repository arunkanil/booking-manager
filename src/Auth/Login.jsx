import React from "react";
import "antd/dist/antd.css";
import "./Login.css";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import LoginDataProvider from "./LoginDataprovider";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      home: false
    };
    this.LoginDataProvider = new LoginDataProvider();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        // const res = await this.LoginDataProvider.formSubmit(values);
        //api to login. also returns user details and token storedin localstorage
        
            sessionStorage.setItem("is_logged_in", "true");
            // localStorage.setItem("token", res.data.token);
            this.props.setAuth("true"); //to set authorisation in app.js. passed here as props
            this.setState({ home: true });
          // }
          this.setState({ loading: false });
        // }
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.home === false) {
      return (
        <div style={{ background:"grey"}}>
          <div className="login">
            <div className="login-container -lg p-3 mb-5 ml-3 bg-white rounded">
              <Form
                onSubmit={this.handleSubmit}
                className="login-form px-5 py-5"
              >
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Sign in</strong>
                  </h3>
                </div>
                <Form.Item>
                  {getFieldDecorator("outlook_id", {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                      style={{ width: "300px" }}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      style={{ width: "300px" }}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    loading={this.state.loading}
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Link to="/"></Link>;
    }
  }
}
const WrappedLogin = Form.create({ name: "normal_login" })(Login);
export default WrappedLogin;
