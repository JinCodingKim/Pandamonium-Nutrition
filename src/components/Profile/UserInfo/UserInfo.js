import React, { Component } from "react";
//React-router
import { Link } from "react-router-dom";
//Material-ui
import Paper from "material-ui/Paper";
import CommunicationEmail from "material-ui/svg-icons/communication/email";
import CommunicationLocationOn from "material-ui/svg-icons/communication/location-on";
//Redux
import { connect } from "react-redux";
import { getUser } from "../../../ducks/user";
//Local
import ProfileManager from "./ProfileManager/ProfileManager";
import "./UserInfo.css";

class UserInfo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUser();
    // console.log(this.props.user);
  }
  render() {
    const { user = { user: [] } } = this.props;
    return (
      <div className="user-wrapper">
        <Paper className="circle-paper" zDepth={2} circle={true}>
          <img className="user-image" src={user.user.user_img} />
        </Paper>
        <div className="personal-container-name" placeholder="Name">
          {user.user.user_name}
        </div>
        <div className="personal-container-age" placeholder="Age">
          {user.user.user_age}
        </div>
        <Paper className="user-personal-wrapper" zDepth={2}>
          <div className="user-location-top-wrapper">
            <CommunicationEmail className="location-icon" />
            <div className="email-address-container" placeholder="Email">
              <div className="email-address-title">EMAIL</div>
              <div className="email-address-info">{user.user.user_email}</div>
            </div>
          </div>

          <div className="user-location-bottom-wrapper">
            <CommunicationLocationOn className="location-icon" />
            <div className="email-address-container" placeholder="Address">
              <div className="email-address-title">ADDRESS</div>
              <div className="email-address-info">
                {user.user.user_address}
                500 S. Ervay St. Dallas, TX 75031
              </div>
            </div>
          </div>
        </Paper>
      </div>

      //   <div className="user-button-edit-wrapper">
      //     <Link to="/profile/manager">
      //       <button className="user-button">
      //         <MdEdit className="edit-button" />
      //       </button>
      //     </Link>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(UserInfo);
