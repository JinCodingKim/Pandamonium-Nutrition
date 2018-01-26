import React, { Component } from "react";
//React-Slick (Slider)
import Slider from "react-slick";
//local
import allthewhey from "./all_the_whey.png";
import "./Home.css";

class Home extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true,
      arrows: false
    };
    return (
      <div>
        <Slider {...settings}>
          <a className="slider-container" href="/product/protein">
            <img src={allthewhey} className="slider-image" />
          </a>
          <div>There</div>
        </Slider>
        Welcome to Home Page
      </div>
    );
  }
}

export default Home;
