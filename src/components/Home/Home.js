import React, { Component } from "react";
//React-Slick (Slider)
import Slider from "react-slick";
//local
import allthewhey from "./banner_whey.png";
import shaker from "./banner_shaker.png";
import featured from "./as_featured_on.png";
import "./Home.css";

class Home extends Component {
  render() {
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
        <Slider {...settings}>
          <a className="slider-container" href="/product/protein">
            <img src={allthewhey} className="slider-image" />
          </a>
          <a className="slider-container" href="/product/shaker">
            <img src={shaker} className="slider-image" />
          </a>
        </Slider>
        <div className="featured-banner-wrapper">
          <img src={featured} className="featured-banner" />
        </div>
      </div>
    );
  }
}

export default Home;
