import React, { Component } from "react";
//Prop-types
import PropTypes from "prop-types";
//Material-ui
import RaisedButton from "material-ui/RaisedButton";
import ActionCheckCircle from "material-ui/svg-icons/action/check-circle";
//Redux
import { connect } from "react-redux";
import {
  getUserExercises,
  addUserExercise,
  editUserExercise,
  deleteUserExercise
} from "../../../ducks/workout";
//Local
import PersonalExerciseDetail from "./PersonalExerciseDetail/PersonalExerciseDetail";

class PersonalExercises extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bodyPart: "",
      addName: "",
      addDescription: "",
      assignedPart: ""
    };

    this.filterByExercise = this.filterByExercise.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
    this.updateEx = this.updateEx.bind(this);
    this.removeEx = this.removeEx.bind(this);
    this.handlePart = this.handlePart.bind(this);
    this.handleNewExercise = this.handleNewExercise.bind(this);
  }

  componentDidMount() {
    const { user, getUserExercises } = this.props;
    getUserExercises(user.user_id);
  }

  filterByExercise(e) {
    this.setState({
      bodyPart: e.target.value
    });
  }

  handleAddChange(prop, val) {
    this.setState({ [prop]: val });
  }

  updateEx(id, name, description) {
    const { editUserExercise } = this.props;
    editUserExercise(id, name, description);
  }

  removeEx(id) {
    const { user, deleteUserExercise, getUserExercises } = this.props;
    deleteUserExercise(id).then(res => getUserExercises(user.user_id));
  }

  handlePart(e) {
    this.setState({
      assignedPart: e.target.value
    });
  }

  handleNewExercise(name, muscle, description) {
    const { addUserExercise } = this.props;
    addUserExercise(name, parseInt(muscle), description);
  }

  render() {
    const { userExercises = [], loading } = this.props;
    const { bodyPart, addName, addDescription, assignedPart } = this.state;
    if (loading) return <h1>Page Is Loading...</h1>;
    let personalList = userExercises
      .filter(ex => {
        return JSON.stringify(ex.category) === bodyPart || bodyPart === "";
      })
      .map(exercise => {
        return (
          <PersonalExerciseDetail
            key={exercise.exercise_id}
            exercise={exercise}
            updateEx={this.updateEx}
            removeEx={this.removeEx}
          />
        );
      });

    return (
      <div className="personal-ex-main-container">
        <div className="left-personal-ex-wrapper">
          <select
            className="personal-filter-container"
            value={bodyPart}
            onChange={this.filterByExercise}
          >
            <option value="">Filter By Body Part</option>
            <option value="11">Chest</option>
            <option value="12">Back</option>
            <option value="13">Shoulders</option>
            <option value="10">Abs</option>
            <option value="14">Calves</option>
            <option value="9">Legs</option>
            <option value="8">Arms</option>
          </select>
          <div className="personal-exercises-wrapper">{personalList}</div>
        </div>
        <div className="personal-ex-container">
          <input
            className="add-title"
            onChange={e => this.handleAddChange("addName", e.target.value)}
            type="text"
            placeholder="Title"
            value={addName}
          />
          <select
            className="add-part"
            value={assignedPart}
            onChange={this.handlePart}
          >
            <option value="">Muscle Worked</option>
            <option value="11">Chest</option>
            <option value="12">Back</option>
            <option value="13">Shoulders</option>
            <option value="10">Abs</option>
            <option value="14">Calves</option>
            <option value="9">Legs</option>
            <option value="8">Arms</option>
          </select>
          <textarea
            className="add-description"
            onChange={e =>
              this.handleAddChange("addDescription", e.target.value)
            }
            placeholder="Description"
            value={addDescription}
          />
          <RaisedButton
            label="Submit Exercise"
            primary={true}
            labelPosition="after"
            className="add-ex-button"
            icon={<ActionCheckCircle />}
            onClick={() =>
              this.handleNewExercise(addName, assignedPart, addDescription)
            }
          />
        </div>
      </div>
    );
  }
}

PersonalExercises.propTypes = {
  bodyPart: PropTypes.oneOf(["", "11", "12", "13", "10", "9", "14", "8"])
    .isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    userExercises: state.workout.userExercises,
    loading: state.workout.loading
  };
};

export default connect(mapStateToProps, {
  getUserExercises,
  addUserExercise,
  editUserExercise,
  deleteUserExercise
})(PersonalExercises);
