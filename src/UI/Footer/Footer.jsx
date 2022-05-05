import React from "react";
import { Layout } from "antd";
import { UNTANGLE } from "../../App/Utils/Urls";
const { Footer } = Layout;

export default class FormFooter extends React.Component {
  render() {
    return (
      <Footer
        style={{
          textAlign: "center",
          flexShrink: 0,
          padding: 5,
          height: 77
        }}
      >
        <div className="row">
          <div className="col-12">
            Powered by
            <a href={UNTANGLE} target="_blank" rel="noopener noreferrer">
              {" "}
              Untangle_
            </a>
          </div>
          <div
            className="col-12 text-bottom"
            style={{ fontSize: 12, marginTop: 20 }}
          >
            This web-app works best with Google Chrome, Mozilla Firefox and IE
            11+
          </div>
        </div>
      </Footer>
    );
  }
}
