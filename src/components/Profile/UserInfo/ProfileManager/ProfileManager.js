import React, { Component } from "react";
//Material-ui
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
//Redux
import { connect } from "react-redux";
import { updateUser } from "../../../../ducks/user";
//Local
import "./ProfileManager.css";

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
        <Paper className="body-content-wrapper" zDepth={1}>
          <TextField
            className="update-input"
            type="text"
            floatingLabelText="Full Name"
            onChange={e => this.handleChange("name", e.target.value)}
          />

          <TextField
            className="update-input"
            type="text"
            floatingLabelText="Age"
            onChange={e => this.handleChange("age", e.target.value)}
          />

          <TextField
            className="update-input"
            type="img"
            floatingLabelText="Image URL"
            hintText="Input .png URL Path"
            onChange={e => this.handleChange("img", e.target.value)}
          />
        </Paper>
        <RaisedButton
          label="Submit"
          onClick={this.handleClick}
          className="submit-button"
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps, { updateUser })(ProfileManager);
