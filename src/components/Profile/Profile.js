import React, { Component } from "react";
import UserInfo from "./UserInfo/UserInfo";
// import OrderHistory from "./OrderHistory/OrderHistory";

import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <div className="profile-body-main-wrapper">
        <UserInfo />
        {/* <OrderHistory /> */}
      </div>
    );
  }
}

export default Profile;
