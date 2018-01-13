import React, { Component } from "react";
import MdExitToApp from "react-icons/lib/md/exit-to-app";

class LogOut extends Component {
  render() {
    return (
      <button className="user-button">
        <MdExitToApp
          className="edit-button"
          href={process.env.REACT_APP_LOGOUT}
        />
      </button>
    );
  }
}

export default LogOut;
