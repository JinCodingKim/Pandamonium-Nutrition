import React, { Component } from "react";
//React-Slick (Slider)
import Slider from "react-slick";
//Material-ui
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
//local
import allthewhey from "./banner_whey.png";
import shaker from "./banner_shaker.png";
import featured from "./as_featured_on.png";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      firstTime: true
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentWillMount() {
    sessionStorage.getItem("firstTime") &&
      this.setState({
        firstTime: JSON.parse(sessionStorage.getItem("firstTime"))
      });
  }

  componentDidMount() {
    const { firstTime } = this.state;
    if (firstTime) {
      setTimeout(
        function() {
          this.setState({
            open: !this.state.open,
            firstTime: false
          });
        }.bind(this),
        3000
      );
    }
  }

  handleShow() {
    this.setState(
      {
        open: !this.state.open,
        firstTime: false
      },
      () => {
        sessionStorage.setItem(
          "firstTime",
          JSON.stringify(this.state.firstTime)
        );
      }
    );
  }

  handleClose() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { open } = this.state;
    const modalStyle = {
      content: {
        width: "70%",
        height: "50%"
      }
    };

    const actions = [
      <div className="modal-buttons">
        <RaisedButton
          label="Don't Show Again"
          primary={true}
          onClick={this.handleShow}
        />,
        <RaisedButton label="Close" primary={true} onClick={this.handleClose} />
      </div>
    ];

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true,
      arrows: false
    };
    return (
      <div className="home-container">
        <Dialog contentStyle={modalStyle} open={open} actions={actions}>
          <div className="modal-dialog">
            <h4>
              Welcome!
              <br />
              <br /> Pandamonium Sports Nutrition is a mock e-Commerce site for
              sports nutrition supplements.
            </h4>
            <br />
            <p className="modal-notice">
              <b>Notice: </b>
              This website is completely fictional, every item on this website
              is NOT real, and created for web development project purposes.
            </p>
            <br />
            <div className="modal-details">
              Once you register, you are able to get extra contents:
              <ul className="modal-list">
                <li>Workout List</li>
                <li>Workout Plan</li>
                <li>Add Exercise To Profile</li>
                <li>Edit/Add Exercise Within Profile</li>
                <li>Edit Profile Information</li>
              </ul>
              <br />
              Thank you for visiting the page. Enjoy!
            </div>
          </div>
        </Dialog>
        <Slider {...settings}>
          <a className="slider-container" href="/product/supplement-protein">
            <img src={allthewhey} alt="" className="slider-image" />
          </a>
          <a className="slider-container" href="/product/accessory-shaker">
            <img src={shaker} alt="" className="slider-image" />
          </a>
        </Slider>
        <div className="featured-banner-wrapper">
          <img src={featured} alt="" className="featured-banner" />
        </div>
      </div>
    );
  }
}

export default Home;
