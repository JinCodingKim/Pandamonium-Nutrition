import React, { Component } from "react";
//Material-ui

//Redux
import { connect } from "react-redux";
import { updateUser } from "../../../../ducks/user";

class ProfileManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      age: parseInt(""),
      img: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }

  handleClick() {
    const { name, age, img } = this.state;
    this.props.updateUser({ name, age, img });
    window.location.href = "/profile";
  }

  render() {
    return (
      <div className="body-main-wrapper">
        <div className="body-header">
          <h4 className="body-header-text">Profile Information</h4>
        </div>
        <div className="body-content">
          <div className="update-wrapper">
            <input
              className="update-input"
              type="text"
              placeholder="Name"
              onChange={e => this.handleChange("name", e.target.value)}
            />
          </div>

          <div className="update-wrapper">
            <input
              className="update-input"
              type="text"
              placeholder="Age"
              onChange={e => this.handleChange("age", e.target.value)}
            />
          </div>

          <div className="update-wrapper">
            <input
              className="update-input"
              type="img"
              placeholder="Image URL"
              onChange={e => this.handleChange("img", e.target.value)}
            />
          </div>
        </div>

        <div />
        <button className="user-button" onClick={this.handleClick}>
          Submit
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, { updateUser })(ProfileManager);
