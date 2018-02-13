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
import PlacesFitnessCenter from "material-ui/svg-icons/places/fitness-center";
import ContentContentPaste from "material-ui/svg-icons/content/content-paste";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
//React-Router
import { NavLink } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getUser } from "../../ducks/user";
//Local
import logo from "./panda.png";
import pandamonium from "./pandamonium.png";
import fullLogo from "./pandamonium_nutrition.png";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
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
    const { user = [] } = this.props.user;
    const { opened } = this.state;

    const img = <img className="logo-img" alt="" src={logo} />;
    const navStyles = {
      mobileIconLeft: {
        height: 32.5,
        width: 32.5,
        marginTop: 8.75,
        marginLeft: "4.5vw"
      },
      mobileIconRight: {
        height: 32.5,
        width: 32.5,
        marginTop: 8.75,
        marginRight: "4.5vw"
      },
      desktopIcons: {
        height: 32.5,
        width: 32.5,
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 12
      }
    };

    return (
      <div>
        <div className="mobile-nav">
          <AppBar
            title={img}
            className="mobile-bar"
            iconElementLeft={
              <NavigationMenu style={navStyles.mobileIconLeft} />
            }
            iconElementRight={
              <NavLink to="/cart">
                <ActionShoppingCart style={navStyles.mobileIconRight} />
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
            {!user || user.user_id === 1 ? (
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
                <MenuItem leftIcon={<PlacesFitnessCenter />}>
                  <NavLink className="menu-item-wrapper" to="/exercises">
                    <p className="menu-item"> Workout List </p>
                  </NavLink>
                </MenuItem>
                <MenuItem leftIcon={<ContentContentPaste />}>
                  <NavLink className="menu-item-wrapper" to="/create">
                    <p className="menu-item"> Workout Plan </p>
                  </NavLink>
                </MenuItem>

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

        <div className="desktop-nav">
          <div className="top-bar">
            {!user || user.user_id === 1 ? (
              <div className="nav-out-container">
                <a href={process.env.REACT_APP_LOGIN}>
                  <ActionAccountBox style={navStyles.desktopIcons} />
                </a>
                <img className="top-img" alt="" src={pandamonium} />
                <NavLink to="/cart">
                  <ActionShoppingCart style={navStyles.desktopIcons} />
                </NavLink>
              </div>
            ) : (
              <div className="nav-logged-container">
                <div className="nav-logged-left">
                  <NavLink to="/profile">
                    <ActionFace style={navStyles.desktopIcons} />
                  </NavLink>
                  <a href={process.env.REACT_APP_LOGOUT}>
                    <ActionExitToApp style={navStyles.desktopIcons} />
                  </a>
                </div>
                <img className="top-img" alt="" src={pandamonium} />
                <div className="nav-logged-right">
                  <NavLink to="/exercises">
                    <PlacesFitnessCenter style={navStyles.desktopIcons} />
                  </NavLink>

                  <NavLink to="/create">
                    <ContentContentPaste style={navStyles.desktopIcons} />
                  </NavLink>

                  <NavLink to="/cart">
                    <ActionShoppingCart style={navStyles.desktopIcons} />
                  </NavLink>
                </div>
              </div>
            )}
          </div>
          <div className="middle-bar">
            <img className="desktop-img" alt="" src={logo} />
          </div>
          <div className="bottom-bar">
            <NavLink className="desktop-navlink-wrapper" to="/">
              <p className="desktop-navlink"> HOME </p>
            </NavLink>
            <NavLink className="desktop-navlink-wrapper" to="/shop">
              <p className="desktop-navlink"> SHOP </p>
            </NavLink>
            <NavLink className="desktop-navlink-wrapper" to="/about">
              <p className="desktop-navlink"> ABOUT </p>
            </NavLink>
            <NavLink className="desktop-navlink-wrapper" to="/contact">
              <p className="desktop-navlink"> CONTACT </p>
            </NavLink>
          </div>
        </div>

        <div className="desktop-full-nav">
          <img className="full-img" alt="" src={fullLogo} />
          <div className="full-navlink-container">
            <NavLink className="full-navlink-wrapper" to="/">
              <p className="full-navlink"> HOME </p>
            </NavLink>
            <NavLink className="full-navlink-wrapper" to="/shop">
              <p className="full-navlink"> SHOP </p>
            </NavLink>
            {!user || user.user_id === 1 ? null : (
              <div className="full-navlink-wrapper">
                <button className="full-dropdown-button">
                  {" "}
                  WORKOUT
                  <i className="fa fa-caret-down" />
                </button>
                <div className="dropdown-content">
                  <NavLink className="dropdown-link-one" to="/exercises">
                    <p className="full-navlink"> LIST </p>
                  </NavLink>
                  <NavLink className="dropdown-link" to="/create">
                    <p className="full-navlink"> PLAN </p>
                  </NavLink>
                </div>
              </div>
            )}
            <NavLink className="full-navlink-wrapper" to="/about">
              <p className="full-navlink"> ABOUT </p>
            </NavLink>
            <NavLink className="full-navlink-wrapper" to="/contact">
              <p className="full-navlink"> CONTACT </p>
            </NavLink>
          </div>
          {!user || user.user_id === 1 ? (
            <div className="full-right-container">
              <a href={process.env.REACT_APP_LOGIN}>
                <ActionAccountBox style={navStyles.desktopIcons} />
              </a>
              <NavLink to="/cart">
                <ActionShoppingCart style={navStyles.desktopIcons} />
              </NavLink>
            </div>
          ) : (
            <div className="full-right-in-container">
              <NavLink to="/profile">
                <ActionFace style={navStyles.desktopIcons} />
              </NavLink>
              <a href={process.env.REACT_APP_LOGOUT}>
                <ActionExitToApp style={navStyles.desktopIcons} />
              </a>
              <NavLink to="/cart">
                <ActionShoppingCart style={navStyles.desktopIcons} />
              </NavLink>
            </div>
          )}
        </div>
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
