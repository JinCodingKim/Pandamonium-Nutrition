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
import "./PersonalExercises.css";

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
    const { getUserExercises } = this.props;
    getUserExercises();
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
    editUserExercise(id, name, description).then(res => {
      const { getUserExercises } = this.props;
      getUserExercises();
    });
  }

  removeEx(id) {
    const { deleteUserExercise, getUserExercises } = this.props;
    deleteUserExercise(id).then(res => {
      const { getUserExercises } = this.props;
      getUserExercises();
    });
  }

  handlePart(e) {
    this.setState({
      assignedPart: e.target.value
    });
  }

  handleNewExercise() {
    const { addUserExercise } = this.props;
    const { addName, assignedPart, addDescription } = this.state;
    addUserExercise(addName, assignedPart, addDescription).then(res => {
      const { getUserExercises } = this.props;
      getUserExercises();
      this.setState({
        addName: "",
        addDescription: "",
        assignedPart: ""
      });
    });
  }

  render() {
    const { userExercises = [], loading } = this.props;
    const { bodyPart, addName, addDescription, assignedPart } = this.state;
    if (loading) return <h1>Page Is Loading...</h1>;
    let personalList = userExercises
      .filter(ex => {
        return JSON.stringify(ex.category) === bodyPart || bodyPart === "";
      })
      .map((exercise, index) => {
        return (
          <PersonalExerciseDetail
            key={index}
            name={exercise.name}
            description={exercise.description}
            id={exercise.exercise_id}
            updateEx={this.updateEx}
            removeEx={this.removeEx}
          />
        );
      });

    return (
      <div className="personal-ex-main-wrapper">
        <div className="personal-filter-container">
          <label className="personal-filter-title">Filter</label>
          <select
            className="personal-filter-select"
            value={bodyPart}
            onChange={this.filterByExercise}
          >
            <option value=""> Filter...</option>
            <option value="11">Chest</option>
            <option value="12">Back</option>
            <option value="13">Shoulders</option>
            <option value="10">Abs</option>
            <option value="14">Calves</option>
            <option value="9">Legs</option>
            <option value="8">Arms</option>
          </select>
        </div>
        <div className="personal-exercises-wrapper">{personalList}</div>
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