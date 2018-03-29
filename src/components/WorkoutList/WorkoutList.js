import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { getExercises, addExercise, updateExercise } from "../../ducks/workout";
//Prop-types
import PropTypes from "prop-types";
//Material-ui
import RaisedButton from "material-ui/RaisedButton";
import ActionStars from "material-ui/svg-icons/action/stars";
//Sweetalert2
import swal from "sweetalert2";
//Loader
import LoaderSVG from "../../ball-triangle.svg";
//Local
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
    if (userExercises.length === 0) {
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

    if (loading)
      return (
        <div className="loader-container">
          <img className="loader" src={LoaderSVG} />
        </div>
      );
    const exerciseList = exercises
      .filter(ex => {
        return JSON.stringify(ex.category) === bodyPart || bodyPart === "";
      })
      .map(exercise => {
        return (
          <div className="exercise" key={exercise.id}>
            <h2 className="exercise-title">{exercise.name}</h2>
            <p className="exercise-description">
              {exercise.description
                .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "")
                .replace(/(<li[^>]+?>|<li>|<\/li>)/gim, "")
                .replace(/(<ol[^>]+?>|<ol>|<\/ol>)/gim, "")
                .replace(/(<ul[^>]+?>|<ul>|<\/ul>)/gim, "")
                .replace(/(<em[^>]+?>|<em>|<\/em>)/gim, "")
                .replace(/(<strong[^>]+?>|<strong>|<\/strong>)/gim, "")}
            </p>
            <RaisedButton
              label="Add to Favorites"
              primary={true}
              labelPosition="after"
              className="favorites-button"
              icon={<ActionStars />}
              onClick={() => {
                this.handleExercise(
                  exercise.id,
                  exercise.name,
                  exercise.category,
                  exercise.description
                );

                swal({
                  title: `${exercise.name} added to Favorites!`,
                  type: "success",
                  confirmButtonText: "Back to List",
                  confirmButtonColor: "#ff6d00"
                });
              }}
            />
            <br />
          </div>
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

WorkoutList.propTypes = {
  bodyPart: PropTypes.oneOf(["", "11", "12", "13", "10", "9", "14", "8"])
    .isRequired
};

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
