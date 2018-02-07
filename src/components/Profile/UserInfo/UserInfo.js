import React, { Component } from "react";
//Material-ui
import Paper from "material-ui/Paper";
import CommunicationEmail from "material-ui/svg-icons/communication/email";
import CommunicationLocationOn from "material-ui/svg-icons/communication/location-on";
import { orangeA700 } from "material-ui/styles/colors";
//Redux
import { connect } from "react-redux";
import { getUser } from "../../../ducks/user";
//Local
import "./UserInfo.css";

class UserInfo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { getUser } = this.props;
    getUser();
  }
  render() {
    const { user = [] } = this.props;
    return (
      <div className="user-wrapper">
        <Paper className="circle-paper" zDepth={2} circle={true}>
          <img className="user-image" src={user.user_img} />
        </Paper>
        <div className="personal-container-name" placeholder="Name">
          {user.user_name}
        </div>
        <div className="personal-container-age" placeholder="Age">
          {user.user_age}
        </div>
        <Paper className="user-personal-wrapper" zDepth={2}>
          <div className="user-location-top-wrapper">
            <CommunicationEmail className="location-icon" color={orangeA700} />
            <div className="email-address-container" placeholder="Email">
              <div className="email-address-title">EMAIL</div>
              <div className="email-address-info">{user.user_email}</div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps, { getUser })(UserInfo);
