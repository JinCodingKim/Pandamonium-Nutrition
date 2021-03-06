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
import { NavLink, withRouter } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getUser } from "../../ducks/user";
//Local
import logo from "./panda.png";
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
    const { pathname } = this.props.location;
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
      }
    };

    return (
      <div>
        <div className="mobile-nav">
          <AppBar
            title={<NavLink to="/">{img}</NavLink>}
            className="mobile-bar"
            iconElementLeft={
              <NavigationMenu style={navStyles.mobileIconLeft} />
            }
            iconElementRight={
              <NavLink to="/cart" onClick={opened && this.toggleDrawer}>
                <ActionShoppingCart
                  style={{
                    ...navStyles.mobileIconRight,
                    color: pathname === "/cart" ? "black" : "#eee"
                  }}
                />
              </NavLink>
            }
            onLeftIconButtonClick={this.toggleDrawer}
          />
          <Drawer
            open={opened}
            docked={false}
            onRequestChange={this.toggleDrawer}
          >
            <MenuItem
              leftIcon={
                <ActionHome
                  style={{
                    fill: pathname === "/" ? "#ff6d00" : "rgb(117, 117, 117)"
                  }}
                />
              }
            >
              <NavLink
                className="menu-item-wrapper"
                to="/"
                onClick={this.toggleDrawer}
              >
                <p className="menu-item"> Home </p>
              </NavLink>
            </MenuItem>
            <MenuItem
              leftIcon={
                <ActionShop
                  style={{
                    fill:
                      pathname === "/shop" || pathname.includes("/product")
                        ? "#ff6d00"
                        : "rgb(117, 117, 117)"
                  }}
                />
              }
            >
              <NavLink
                className="menu-item-wrapper"
                to="/shop"
                onClick={this.toggleDrawer}
              >
                <p className="menu-item"> Shop </p>
              </NavLink>
            </MenuItem>
            <MenuItem
              leftIcon={
                <CommunicationBusiness
                  style={{
                    fill:
                      pathname === "/about" ? "#ff6d00" : "rgb(117, 117, 117)"
                  }}
                />
              }
            >
              <NavLink
                className="menu-item-wrapper"
                to="/about"
                onClick={this.toggleDrawer}
              >
                <p className="menu-item"> About </p>
              </NavLink>
            </MenuItem>
            <MenuItem
              leftIcon={
                <CommunicationPhone
                  style={{
                    fill:
                      pathname === "/contact" ? "#ff6d00" : "rgb(117, 117, 117)"
                  }}
                />
              }
            >
              <NavLink
                className="menu-item-wrapper"
                to="/contact"
                onClick={this.toggleDrawer}
              >
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
                <MenuItem
                  leftIcon={
                    <PlacesFitnessCenter
                      style={{
                        fill:
                          pathname === "/exercises"
                            ? "#ff6d00"
                            : "rgb(117, 117, 117)"
                      }}
                    />
                  }
                >
                  <NavLink
                    className="menu-item-wrapper"
                    to="/exercises"
                    onClick={this.toggleDrawer}
                  >
                    <p className="menu-item"> Workout List </p>
                  </NavLink>
                </MenuItem>
                <MenuItem
                  leftIcon={
                    <ContentContentPaste
                      style={{
                        fill:
                          pathname === "/create"
                            ? "#ff6d00"
                            : "rgb(117, 117, 117)"
                      }}
                    />
                  }
                >
                  <NavLink
                    className="menu-item-wrapper"
                    to="/create"
                    onClick={this.toggleDrawer}
                  >
                    <p className="menu-item"> Workout Plan </p>
                  </NavLink>
                </MenuItem>

                <MenuItem
                  leftIcon={
                    <ActionFace
                      style={{
                        fill:
                          pathname === "/profile"
                            ? "#ff6d00"
                            : "rgb(117, 117, 117)"
                      }}
                    />
                  }
                >
                  <NavLink
                    className="menu-item-wrapper"
                    to="/profile"
                    onClick={this.toggleDrawer}
                  >
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
                  <ActionAccountBox className="desktop-icons" />
                </a>
                <NavLink to="/">
                  <img className="top-img" alt="" src={fullLogo} />
                </NavLink>
                <NavLink to="/cart" onClick={this.toggleDrawer}>
                  <ActionShoppingCart
                    className="desktop-icons"
                    style={{
                      color: pathname === "/cart" ? "#ff6d00" : "#eee"
                    }}
                  />
                </NavLink>
              </div>
            ) : (
              <div className="nav-logged-container">
                <div className="nav-logged-left">
                  <NavLink to="/profile" onClick={this.toggleDrawer}>
                    <ActionFace
                      className="desktop-icons"
                      style={{
                        color: pathname === "/profile" ? "#ff6d00" : "#eee"
                      }}
                    />
                  </NavLink>
                  <a href={process.env.REACT_APP_LOGOUT}>
                    <ActionExitToApp className="desktop-icons" />
                  </a>
                </div>
                <NavLink to="/">
                  <img className="top-img-logged" alt="" src={fullLogo} />
                </NavLink>
                <div className="nav-logged-right">
                  <NavLink to="/exercises" onClick={this.toggleDrawer}>
                    <PlacesFitnessCenter
                      className="desktop-icons"
                      style={{
                        color: pathname === "/exercises" ? "#ff6d00" : "#eee"
                      }}
                    />
                  </NavLink>

                  <NavLink to="/create" onClick={this.toggleDrawer}>
                    <ContentContentPaste
                      className="desktop-icons"
                      style={{
                        color: pathname === "/create" ? "#ff6d00" : "#eee"
                      }}
                    />
                  </NavLink>

                  <NavLink to="/cart" onClick={this.toggleDrawer}>
                    <ActionShoppingCart
                      className="desktop-icons"
                      style={{
                        color: pathname === "/cart" ? "#ff6d00" : "#eee"
                      }}
                    />
                  </NavLink>
                </div>
              </div>
            )}
          </div>
          <div className="bottom-bar">
            <NavLink
              className="desktop-navlink-wrapper"
              to="/"
              onClick={this.toggleDrawer}
            >
              <p
                className="desktop-navlink"
                style={{
                  color: pathname === "/" ? "#eee" : "black"
                }}
              >
                {" "}
                HOME{" "}
              </p>
            </NavLink>
            <NavLink
              className="desktop-navlink-wrapper"
              to="/shop"
              onClick={this.toggleDrawer}
            >
              <p
                className="desktop-navlink"
                style={{
                  color:
                    pathname === "/shop" || pathname.includes("/product")
                      ? "#eee"
                      : "black"
                }}
              >
                {" "}
                SHOP{" "}
              </p>
            </NavLink>
            <NavLink
              className="desktop-navlink-wrapper"
              to="/about"
              onClick={this.toggleDrawer}
            >
              <p
                className="desktop-navlink"
                style={{
                  color: pathname === "/about" ? "#eee" : "black"
                }}
              >
                {" "}
                ABOUT{" "}
              </p>
            </NavLink>
            <NavLink
              className="desktop-navlink-wrapper"
              to="/contact"
              onClick={this.toggleDrawer}
            >
              <p
                className="desktop-navlink"
                style={{
                  color: pathname === "/contact" ? "#eee" : "black"
                }}
              >
                {" "}
                CONTACT{" "}
              </p>
            </NavLink>
          </div>
        </div>

        <div className="desktop-full-nav">
          <img className="full-img" alt="" src={fullLogo} />
          <div className="full-navlink-container">
            <NavLink className="full-navlink-wrapper" to="/">
              <p
                className="full-navlink"
                style={{
                  color: pathname === "/" ? "#ff6d00" : "#eee"
                }}
              >
                {" "}
                HOME{" "}
              </p>
            </NavLink>
            <NavLink className="full-navlink-wrapper" to="/shop">
              <p
                className="full-navlink"
                style={{
                  color:
                    pathname === "/shop" || pathname.includes("/product")
                      ? "#ff6d00"
                      : "#eee"
                }}
              >
                {" "}
                SHOP{" "}
              </p>
            </NavLink>
            {user &&
              user.user_id !== 1 && (
                <div className="full-navlink-wrapper">
                  <button
                    className="full-dropdown-button"
                    style={{
                      color:
                        pathname === "/exercises" || pathname === "/create"
                          ? "#ff6d00"
                          : "#eee"
                    }}
                  >
                    {" "}
                    WORKOUT
                    <i className="fa fa-caret-down" />
                  </button>
                  <div className="dropdown-content">
                    <NavLink className="dropdown-link-one" to="/exercises">
                      <p
                        className="full-navlink"
                        style={{
                          color: pathname === "/exercises" ? "#ff6d00" : "#eee"
                        }}
                      >
                        {" "}
                        LIST{" "}
                      </p>
                    </NavLink>
                    <NavLink className="dropdown-link" to="/create">
                      <p
                        className="full-navlink"
                        style={{
                          color: pathname === "/create" ? "#ff6d00" : "#eee"
                        }}
                      >
                        {" "}
                        PLAN{" "}
                      </p>
                    </NavLink>
                  </div>
                </div>
              )}
            <NavLink className="full-navlink-wrapper" to="/about">
              <p
                className="full-navlink"
                style={{
                  color: pathname === "/about" ? "#ff6d00" : "#eee"
                }}
              >
                {" "}
                ABOUT{" "}
              </p>
            </NavLink>
            <NavLink className="full-navlink-wrapper" to="/contact">
              <p
                className="full-navlink"
                style={{
                  color: pathname === "/contact" ? "#ff6d00" : "#eee"
                }}
              >
                {" "}
                CONTACT{" "}
              </p>
            </NavLink>
          </div>
          {!user || user.user_id === 1 ? (
            <div className="full-right-container">
              <a href={process.env.REACT_APP_LOGIN}>
                <ActionAccountBox className="desktop-icons" />
              </a>
              <NavLink to="/cart">
                <ActionShoppingCart
                  className="desktop-icons"
                  style={{
                    color: pathname === "/cart" ? "#ff6d00" : "#eee"
                  }}
                />
              </NavLink>
            </div>
          ) : (
            <div className="full-right-in-container">
              <NavLink to="/profile">
                <ActionFace
                  className="desktop-icons"
                  style={{
                    color: pathname === "/profile" ? "#ff6d00" : "#eee"
                  }}
                />
              </NavLink>
              <a href={process.env.REACT_APP_LOGOUT}>
                <ActionExitToApp className="desktop-icons" />
              </a>
              <NavLink to="/cart">
                <ActionShoppingCart
                  className="desktop-icons"
                  style={{
                    color: pathname === "/cart" ? "#ff6d00" : "#eee"
                  }}
                />
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

export default withRouter(
  connect(mapStateToProps, {
    getUser
  })(NavBar)
);
