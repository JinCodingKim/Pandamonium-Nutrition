import React, { Component } from "react";
import PropTypes from "prop-types";
import UnfilteredList from "./UnfilteredList";
import axios from "axios";
import "./WorkoutList.css";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      exercises: [],
      name: "",
      description: ""
    };
    this.destroy = this.destroy.bind(this);
    this.add = this.add.bind(this);
    this.nameUpdate = this.nameUpdate.bind(this);
    this.descriptionUpdate = this.descriptionUpdate.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/exercises")
      .then(response => {
        console.log(response);
        this.setState({
          exercises: response.data,
          isLoading: false
        });
      })
      .catch(console.log);
  }
  destroy(id) {
    console.log("asdf");
    axios.delete(`/api/exercises/${id}`).then(response => {
      console.log(response.data);
      this.setState({
        exercises: response.data
      });
    });
  }
  add() {
    let ex = {
      name: this.state.name,
      description: this.state.description,
      license_author: "wger.de"
    };
    axios.post("/api/exercises", ex).then(response => {
      return this.setState({
        exercises: response.data
      });
    });
  }

  update(id, description) {
    this.setState(
      {
        isLoading: true
      },
      () =>
        axios.put(`/api/exercises/${id}`, { description }).then(response => {
          return this.setState({
            exercises: response.data,
            isLoading: false
          });
        })
    );
  }
  nameUpdate(val) {
    this.setState({
      name: val
    });
  }

  descriptionUpdate(val) {
    this.setState({
      description: val
    });
  }

  render() {
    const { exercises, isLoading, name, description } = this.state;
    const { bodyPart } = this.props;
    if (isLoading) return <h1>Page Is Loading...</h1>;
    const exerciseList = exercises
      .filter((e, i) => {
        return JSON.stringify(e.category) === bodyPart || bodyPart === "";
      })
      .map((exercise, i) => {
        return (
          <UnfilteredList
            destroy={this.destroy}
            key={exercise.id}
            exercise={exercise}
            update={this.update}
            index={i}
          />
        );
      });
    return (
      <div className="bigContainer">
        <div className="listContainer">{exerciseList}</div>
        <div className="postContainer">
          <input
            id="postTitle"
            onChange={e => this.nameUpdate(e.target.value)}
            type="text"
            placeholder="Title"
            value={name}
          />
          <textarea
            id="textContainer"
            onChange={e => this.descriptionUpdate(e.target.value)}
            placeholder="Description"
            value={description}
          />
          <button id="postButton" onClick={this.add}>
            Post
          </button>
        </div>
      </div>
    );
  }
}
List.propTypes = {
  bodyPart: PropTypes.oneOf(["", "11", "12", "13", "10", "14", "8"]).isRequired
};

export default List;
