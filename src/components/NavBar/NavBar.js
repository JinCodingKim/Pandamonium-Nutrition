import React, { Component } from "react";
//Material-ui
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import CommunicationBusiness from "material-ui/svg-icons/communication/business";
import ActionShoppingCart from "material-ui/svg-icons/action/shopping-cart";
import ActionShop from "material-ui/svg-icons/action/shop";
import ActionAccountBox from "material-ui/svg-icons/action/account-box";
import ActionExitToApp from "material-ui/svg-icons/action/exit-to-app";
import CommunicationPhone from "material-ui/svg-icons/communication/phone";
import ActionHome from "material-ui/svg-icons/action/home";
//React-Router
import { NavLink } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getUser } from "../../ducks/user";
//Local
import LogOut from "./LogOut/LogOut";
import logo from "./Panda_Logo.png";
import "./NavBar.css";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      drawerOpened: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  toggleDrawer() {
    this.setState({
      opened: !this.state.opened
    });
  }

  render() {
    const img = (
      <img
        style={{ height: 50, width: 50, marginTop: 5, paddingRight: 30 }}
        src={logo}
      />
    );

    return (
      <div>
        <AppBar
          style={{ height: 58 }}
          title={img}
          titleStyle={{ textAlign: "center" }}
          iconElementRight={
            <ActionShoppingCart
              style={{
                height: 23,
                width: 23,
                marginTop: 13,
                marginRight: 10
              }}
            >
              <LogOut href={process.env.REACT_APP_LOGOUT} />
            </ActionShoppingCart>
          }
          onLeftIconButtonClick={() => this.toggleDrawer()}
        />
        <Drawer
          open={this.state.opened}
          docked={false}
          onRequestChange={() => this.toggleDrawer()}
        >
          <MenuItem leftIcon={<ActionHome />}>
            <NavLink className="menu-item-wrapper" to="/">
              <p className="menu-item">Home</p>
            </NavLink>
          </MenuItem>
          <MenuItem leftIcon={<ActionShop />}>
            <NavLink className="menu-item-wrapper" to="/shop">
              <p className="menu-item">Shop</p>
            </NavLink>
          </MenuItem>
          <MenuItem leftIcon={<CommunicationBusiness />}>
            <NavLink className="menu-item-wrapper" to="/about">
              <p className="menu-item">About</p>
            </NavLink>
          </MenuItem>
          <MenuItem leftIcon={<CommunicationPhone />}>
            <NavLink className="menu-item-wrapper" to="/contact">
              <p className="menu-item">Contact</p>
            </NavLink>
          </MenuItem>
          <MenuItem leftIcon={<ActionAccountBox />}>
            {!this.props.user.user_email ? (
              <a
                className="menu-item-wrapper"
                href={process.env.REACT_APP_LOGIN}
              >
                <p className="menu-item">Sign-In</p>
              </a>
            ) : (
              <NavLink className="menu-item-wrapper" to="/profile">
                <p className="menu-item">View Profile</p>
              </NavLink>
            )}
          </MenuItem>
          <MenuItem leftIcon={<ActionExitToApp />}>
            <NavLink className="menu-item-wrapper" to="/signout">
              <p className="menu-item">Sign-Out</p>
            </NavLink>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(NavBar);
