import React, { Component } from "react";
//React-router
import { Link } from "react-router-dom";
//Material-ui
import Paper from "material-ui/Paper";
//React-icons
import MdEmail from "react-icons/lib/md/email";
import MdHome from "react-icons/lib/md/home";
import MdEdit from "react-icons/lib/md/edit";
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
    const squarePaper = {
      height: 300,
      width: 500
    };
    return (
      <div>
        <div className="user-top-wrapper">
          <img
            className="user-image"
            src={this.props.user.user_img}
            // alt="not working"
          />
          <div className="user-personal-wrapper">
            <div className="personal-container-name" placeholder="Name">
              {this.props.user.user_name}
            </div>
            <div className="personal-container-age" placeholder="Age">
              {this.props.user.user_age}
            </div>
          </div>
        </div>

        <div className="user-bottom-wrapper">
          <div className="user-location-wrapper">
            <MdEmail className="location-icon" />
            <div className="email-address-container" placeholder="Email">
              <div className="email-address-title">EMAIL</div>
              <div className="email-address-info">
                {this.props.user.user_email}
              </div>
            </div>
          </div>

          <div className="user-location-wrapper">
            <MdHome className="location-icon" />
            <div className="email-address-container" placeholder="Address">
              <div className="email-address-title">ADDRESS</div>
              <div className="email-address-info">
                {this.props.user.user_address}
                500 S. Ervay St. Dallas, TX 75031
              </div>
            </div>
          </div>
        </div>
        <div className="user-button-edit-wrapper">
          <Link to="/profile/manager">
            <button className="user-button">
              <MdEdit className="edit-button" />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(UserInfo);
