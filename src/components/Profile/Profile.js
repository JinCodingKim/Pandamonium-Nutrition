import React, { Component } from "react";
//React-router
import { NavLink } from "react-router-dom";
//React-Redux
import { connect } from "react-redux";
//Material-ui
import ContentCreate from "material-ui/svg-icons/content/create";
import ActionBuild from "material-ui/svg-icons/action/build";
// import ActionCheckCircle from "material-ui/svg-icons/action/check-circle";
import RaisedButton from "material-ui/RaisedButton";
//Local
import UserInfo from "./UserInfo/UserInfo";
import PersonalExercises from "./PersonalExercises/PersonalExercises";
import "./Profile.css";

class Profile extends Component {
  componentDidMount() {
    if (!this.props.user.user_email) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div className="profile-body-main-wrapper">
        <div className="profile-top-main-wrapper">
          <UserInfo />
          <NavLink to="/profile/manager" className="user-button-edit-wrapper">
            <RaisedButton
              label="Edit Information"
              primary={true}
              labelPosition="after"
              className="user-button-edit"
              icon={<ContentCreate />}
            />
          </NavLink>
        </div>

        <div className="profile-bottom-main-wrapper">
          <PersonalExercises />
          <NavLink to="/exercise/manager" className="user-button-edit-wrapper">
            <RaisedButton
              label="Create Exercise"
              primary={true}
              labelPosition="after"
              className="user-button-create"
              icon={<ActionBuild />}
            />
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(Profile);
