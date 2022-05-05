import React from "react";

export default class ApprovalHierarchy extends React.Component {
  render() {
    return (
      <div className="row ">
        <div className="container">
          <h4 className="pt-3">Approval hierarchy</h4>
          <hr />
          {this.props.approverData != null //maps data to approver hierarchy section from
            ? this.props.approverData.map((
                approverData //approverData. returns null if its empty. this means a connection problem.
              ) => (
                <div className="row">
                  <div className="col-3 pl-4 ">
                    <label>{approverData.approver}</label>
                  </div>
                  <div className="col-4">
                    <label>
                      <b>{approverData.apvr_name}</b>
                    </label>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}
