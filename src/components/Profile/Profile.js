import React, { Component } from "react";
import UserInfo from "./UserInfo/UserInfo";
// import OrderHistory from "./OrderHistory/OrderHistory";
import PersonalExercises from "./PersonalExercises/PersonalExercises";

import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <div className="profile-body-main-wrapper">
        <UserInfo />
        {/* <OrderHistory /> */}
        <PersonalExercises />
      </div>
    );
  }
}

export default Profile;
