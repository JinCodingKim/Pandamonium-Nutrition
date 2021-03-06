import React, { Component } from "react";
//Material-ui
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import ActionCheckCircle from "material-ui/svg-icons/action/check-circle";
//Redux
import { connect } from "react-redux";
import { updateUser } from "../../../ducks/user";
//Local
import "./ProfileManager.css";

class ProfileManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      age: "",
      img: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.user.user_email) {
      this.props.history.push("/");
    }
  }

  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }

  handleClick() {
    const { name, age, img } = this.state;
    const { updateUser } = this.props;
    updateUser({ name, age, img }).then(() => {
      window.location.href = "/profile";
    });
  }

  render() {
    return (
      <div className="body-main-wrapper">
        <Paper className="body-content-wrapper" zDepth={1}>
          <TextField
            type="text"
            floatingLabelText="Full Name"
            inputStyle={{ color: "#000000" }}
            onChange={e => this.handleChange("name", e.target.value)}
          />

          <TextField
            type="text"
            floatingLabelText="Age"
            inputStyle={{ color: "#000000" }}
            onChange={e => this.handleChange("age", e.target.value)}
          />

          <TextField
            type="img"
            floatingLabelText="Image URL"
            hintText="Input .png URL Path"
            inputStyle={{ color: "#000000" }}
            onChange={e => this.handleChange("img", e.target.value)}
          />
        </Paper>
        <RaisedButton
          label="Submit"
          onClick={this.handleClick}
          primary={true}
          className="submit-button"
          labelPosition="after"
          icon={<ActionCheckCircle />}
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
