import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/user";
import UserInfo from "./UserInfo/UserInfo";
// import OrderHistory from "./OrderHistory/OrderHistory";

class Profile extends Component {
  render() {
    return (
      <div className="body-main-wrapper">
        <div className="body-header">
          <h4 className="body-header-text">Profile</h4>
        </div>

        <div className="body-content">
          <UserInfo />
          {/* <OrderHistory /> */}
        </div>
      </div>
    );
  }
}

export default Profile;
