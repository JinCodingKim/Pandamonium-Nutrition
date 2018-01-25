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
import ActionFace from "material-ui/svg-icons/action/face";
//React-Router
import { NavLink } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getUser } from "../../ducks/user";
//Local
import logo from "./panda.png";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    const { getUser } = this.props;
    getUser();
  }

  toggleDrawer() {
    const { opened } = this.state;
    this.setState({
      opened: !opened
    });
  }

  render() {
    const {
      user = {
        user: []
      }
    } = this.props.user;
    const { opened } = this.state;

    const img = (
      <img
        style={{
          height: 45,
          width: 55,
          marginTop: 7,
          paddingRight: 20
        }}
        src={logo}
      />
    );

    return (
      <div>
        <AppBar
          style={{
            height: 58
          }}
          title={img}
          titleStyle={{
            textAlign: "center"
          }}
          iconElementRight={
            <NavLink to="/cart">
              <ActionShoppingCart className="nav-cart" />
            </NavLink>
          }
          onLeftIconButtonClick={() => this.toggleDrawer()}
        />
        <Drawer
          open={opened}
          docked={false}
          onRequestChange={() => this.toggleDrawer()}
        >
          <MenuItem leftIcon={<ActionHome />}>
            <NavLink className="menu-item-wrapper" to="/">
              <p className="menu-item"> Home </p>
            </NavLink>
          </MenuItem>
          <MenuItem leftIcon={<ActionShop />}>
            <NavLink className="menu-item-wrapper" to="/shop">
              <p className="menu-item"> Shop </p>
            </NavLink>
          </MenuItem>
          <MenuItem leftIcon={<CommunicationBusiness />}>
            <NavLink className="menu-item-wrapper" to="/about">
              <p className="menu-item"> About </p>
            </NavLink>
          </MenuItem>
          <MenuItem leftIcon={<CommunicationPhone />}>
            <NavLink className="menu-item-wrapper" to="/contact">
              <p className="menu-item"> Contact </p>
            </NavLink>
          </MenuItem>
          {!user.user_email ? (
            <MenuItem leftIcon={<ActionAccountBox />}>
              <a
                className="menu-item-wrapper"
                href={process.env.REACT_APP_LOGIN}
              >
                <p className="menu-item"> Sign-In </p>
              </a>
            </MenuItem>
          ) : (
            <div>
              <MenuItem leftIcon={<ActionFace />}>
                <NavLink className="menu-item-wrapper" to="/profile">
                  <p className="menu-item"> View Profile </p>
                </NavLink>
              </MenuItem>
              <MenuItem leftIcon={<ActionExitToApp />}>
                <a
                  className="menu-item-wrapper"
                  href={process.env.REACT_APP_LOGOUT}
                >
                  <p className="menu-item"> Sign-Out </p>
                </a>
              </MenuItem>
            </div>
          )}
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

export default connect(mapStateToProps, {
  getUser
})(NavBar);
