import React, { Component } from "react";
//Material-ui
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import ActionCheckCircle from "material-ui/svg-icons/action/check-circle";
//Redux
import { connect } from "react-redux";
import { addUserExercise, getUserExercises } from "../../../ducks/workout";
//Local
import "./ExerciseManager.css";

class ExerciseManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addName: "",
      addDescription: "",
      value: ""
    };

    this.handleAddChange = this.handleAddChange.bind(this);
    this.handlePart = this.handlePart.bind(this);
    this.handleNewExercise = this.handleNewExercise.bind(this);
  }

  componentDidMount() {
    const { user, getUserExercises } = this.props;
    getUserExercises(user.user_id);
  }

  handleAddChange(prop, val) {
    this.setState({ [prop]: val });
  }

  handlePart(event, index, value) {
    // console.log(value);
    this.setState({
      value
    });
  }

  handleNewExercise() {
    const { addUserExercise } = this.props;
    const { addName, value, addDescription } = this.state;
    addUserExercise(addName, value, addDescription).then(() => {
      window.location.href = "/profile";
    });
  }

  render() {
    const { addName, addDescription, value } = this.state;
    return (
      <div className="ex-manager-main-container">
        <Paper className="ex-manager-content-wrapper" zDepth={1}>
          <TextField
            type="text"
            floatingLabelText="Exercise Name"
            inputStyle={{ color: "#000000" }}
            onChange={e => this.handleAddChange("addName", e.target.value)}
          />

          <SelectField
            labelStyle={{ color: "#BDBDBD" }}
            menuItemStyle={{ color: "#000000" }}
            selectedMenuItemStyle={{ color: "#000000" }}
            value={value}
            onChange={this.handlePart}
          >
            <MenuItem value={""} primaryText="Muscle Worked" />
            <MenuItem value={"11"} primaryText="Chest" />
            <MenuItem value={"12"} primaryText="Back" />
            <MenuItem value={"13"} primaryText="Shoulders" />
            <MenuItem value={"10"} primaryText="Abs" />
            <MenuItem value={"14"} primaryText="Calves" />
            <MenuItem value={"9"} primaryText="Legs" />
            <MenuItem value={"8"} primaryText="Arms" />
          </SelectField>
          <TextField
            type="text"
            floatingLabelText="Exercise Description"
            multiLine={true}
            rows={5}
            textareaStyle={{
              color: "#000000",
              border: "1px solid #BDBDBD",
              borderRadius: "2px",
              overFlow: "scroll"
            }}
            onChange={e =>
              this.handleAddChange("addDescription", e.target.value)
            }
          />
        </Paper>
        <RaisedButton
          label="Submit"
          primary={true}
          labelPosition="after"
          className="add-ex-button"
          icon={<ActionCheckCircle />}
          onClick={this.handleNewExercise}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    userExercises: state.workout.userExercises
  };
};

export default connect(mapStateToProps, {
  addUserExercise,
  getUserExercises
})(ExerciseManager);
