import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { getExercises } from "../../ducks/workout";
//Local
import MWFList from "./MWFList/MWFList";
import MTTFList from "./MTTFList/MTTFList";
import "./CreateWorkout.css";

class CreateWorkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days1: [],
      days2: [],
      workouts1: [],
      workouts2: [],
      numberOfDays: 0
    };
    this.threeDays = this.threeDays.bind(this);
    this.fourDays = this.fourDays.bind(this);
  }

  componentDidMount() {
    const { getExercises } = this.props;
    getExercises();
  }

  threeDays() {
    const { exercises, loading } = this.props;
    if (loading) return <h1>Page Is Loading...</h1>;
    let mwfWorkouts = exercises.filter(
      exercise =>
        exercise.category == "11" ||
        exercise.category == "12" ||
        exercise.category == "9" ||
        exercise.category == "10"
    );
    this.setState({
      workouts1: mwfWorkouts,
      numberOfDays: 3,
      days1: [
        "Monday (4 Sets x 8-12 Repetitions Per Exercise):",
        "Wednesday (4 Sets x 8-12 Repetitions Per Exercise):",
        "Friday (4 Sets x 8-12 Repetitions Per Exercise):"
      ]
    });
  }

  fourDays() {
    const { exercises, loading } = this.props;
    if (loading) return <h1>Page Is Loading...</h1>;
    let mttfWorkouts = exercises.filter(
      exercise =>
        exercise.category == "11" ||
        exercise.category == "12" ||
        exercise.category == "13" ||
        exercise.category == "8" ||
        exercise.category == "10" ||
        exercise.category == "9" ||
        exercise.category == "14"
    );
    this.setState({
      workouts2: mttfWorkouts,
      numberOfDays: 4,
      days2: [
        "Monday (4 Sets x 8-12 Repetitions Per Exercise):",
        "Tuesday (4 Sets x 8-12 Repetitions Per Exercise):",
        "Thursday (3 Sets x 12-15 Repetitions Per Exercise):",
        "Friday (3 Sets x 12-15 Repetitions Per Exercise):"
      ]
    });
  }

  render() {
    const { workouts1, workouts2, days1, days2, numberOfDays } = this.state;
    return (
      <div className="create-container">
        <h2 id="create-title">
          How many days per week would you like to work out?:
        </h2>
        <div className="buttons-container">
          <button className="create-button" onClick={this.threeDays}>
            Three Days <span>(Full Body Workouts)</span>
          </button>
          <button className="create-button" onClick={this.fourDays}>
            Four Days <span>(Upper/Lower Split Workouts)</span>
          </button>
        </div>

        <div className="program-container">
          {numberOfDays === 3 ? (
            <MWFList mwf={workouts1} days={days1} />
          ) : (
            <MTTFList mttf={workouts2} days={days2} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.workout.loading,
    exercises: state.workout.exercises
  };
};

export default connect(mapStateToProps, {
  getExercises
})(CreateWorkout);
