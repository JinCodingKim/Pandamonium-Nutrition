import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { getExercises, addExercise, updateExercise } from "../../ducks/workout";
//Local
import Loader from "../Loader/Loader";
import Workout from "./Workout/Workout";
import "./WorkoutList.css";

class WorkoutList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bodyPart: ""
    };

    this.filterByExercise = this.filterByExercise.bind(this);
    this.handleExercise = this.handleExercise.bind(this);
  }

  componentDidMount() {
    const { getExercises, user } = this.props;
    if (!user.user_email) {
      this.props.history.push("/");
    }
    getExercises();
  }

  filterByExercise(e) {
    this.setState({
      bodyPart: e.target.value
    });
  }

  handleExercise(id, name, category, description) {
    const { userExercises, addExercise, updateExercise } = this.props;
    if (!userExercises.length) {
      addExercise(id, name, category, description);
    } else {
      for (let i = 0; i < userExercises.length; i++) {
        if (userExercises[i].axios_id === id) {
          updateExercise(id, name, category, description);
        } else {
          addExercise(id, name, category, description);
        }
      }
    }
  }

  render() {
    const { exercises = [], loading } = this.props;
    const { bodyPart } = this.state;

    if (loading) return <Loader />;
    const exerciseList = exercises
      .filter(ex => {
        return JSON.stringify(ex.category) === bodyPart || bodyPart === "";
      })
      .map(exercise => {
        return (
          <Workout
            key={exercise.id}
            id={exercise.id}
            name={exercise.name}
            category={exercise.category}
            description={exercise.description}
            handleExercise={this.handleExercise}
          />
        );
      });
    return (
      <div className="workout-main-container">
        <select
          className="filter-container"
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

        <div className="list-container">{exerciseList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.workout.loading,
    exercises: state.workout.exercises,
    userExercises: state.workout.userExercises,
    user: state.user.user
  };
};

export default connect(mapStateToProps, {
  getExercises,
  addExercise,
  updateExercise
})(WorkoutList);
