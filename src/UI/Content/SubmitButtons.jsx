import React from "react";
import { Link } from "react-router-dom";

export default class SubmitButtons extends React.Component {
  render() {
    return (
        <div className="text-center input mb-4 mt-4">
        <div className="btn-group">
          <button
            type="submit"
            className="btn btn-dark  mr-4"
            style={{ width: 80 }}
          >
            Submit
          </button>
          <Link to="/">
            <button
              type="reset"
              className="btn btn-secondary "
              style={{ width: 80 }}
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
