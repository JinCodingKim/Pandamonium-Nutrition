import React, { Component } from "react";
import "./About.css";

class About extends Component {
  render() {
    return (
      <article>
        <header>
          <div className="title-bar-about">
            <h2>
              <span>About Pandamonium Sports Nutrition</span>
            </h2>
          </div>
        </header>
        <section className="about-content">
          <div className="about-content-wrapper">
            <h3>
              <b>Creation of Pandamonium Sports Nutrition</b>
            </h3>
            <p className="creation-content">
              Pandamonium Sports Nutrition was founded at DevMountain, with one
              goal in mind: products with real results. Whether you need energy
              and focus for studying and listening to long lectures, or you need
              that extra motivation to push through your workouts after long
              hours of sitting behind a laptop. Here at Pandamonium Sports
              Nutirition, our products are the absolute best - backed by
              scientific studies, multiple research sources, and real results.
              We make sure our sources are pure, and nourish the body and the
              mind, rather than harming it. Accomplish more with Pandamonium
              Sports Nutrition.
            </p>
          </div>
          <div className="conclusion-content-wrapper">
            <h3>
              <b>In Conclusion</b>
            </h3>
            <p className="conclusion-content">
              In conclusion, the answer is simple. We created Pandamonium to
              help people excel in anything they strive for. Whether it be
              programming, designing, exercising, and etc. We aim to be the best
              when it comes to clean and pure supplements. Nevertheless, at
              Pandamonium Sports Nutrition, we understand that you there are
              countless choices to choose from when it comes to sports
              nutritiong and supplements. We care for our customers needs, and
              that is why we will take out time to provide you the information
              and education you need about our products and nutrition. Just
              contact our expert customer service representatives that are on
              standby 24/7, and we will be overjoyed to help you get one step
              closer to reaching your goal.
            </p>
          </div>
        </section>
      </article>
    );
  }
}
export default About;
