import React, { Component } from "react";
//Sweetalert2
import swal from "sweetalert2";
//Material-ui
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ImagePhoto from "material-ui/svg-icons/image/photo";

//Local
import "./Workout.css";
//Axios
import axios from "axios";

class Workout extends Component {
  constructor() {
    super();
    this.state = {
      modalSwitch: false,
      images: []
    };
    this.viewModal = this.viewModal.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    axios.get(`/api/exercise/images/?exercise=${id}`).then(res => {
      this.setState({
        images: res.data
      });
    });
  }

  viewModal() {
    this.setState({
      modalSwitch: !this.state.modalSwitch
    });
  }

  render() {
    const { id, name, description, category, handleExercise } = this.props;
    const { modalSwitch, images } = this.state;

    return (
      <div className="exercise">
        <Dialog
          modal={false}
          contentClassName="modal-content"
          open={modalSwitch}
          onRequestClose={this.viewModal}
          bodyClassName="modal-body"
          paperClassName="modal-paper"
        >
          <div className="modal-view">
            {images.map((image, index) => {
              return (
                <div key={image.id} className="image-container">
                  <img src={image.image} alt="Exercise" className="image" />
                </div>
              );
            })}
          </div>
          )}
        </Dialog>
        <div className="title-image">
          <h2 className="exercise-title">{name}</h2>
          {!images.length ? null : (
            <ImagePhoto onClick={this.viewModal} className="image-photo" />
          )}
          <ActionFavorite
            onClick={() => {
              handleExercise(id, name, category, description);

              swal({
                title: `${name} added to Favorites!`,
                type: "success",
                confirmButtonText: "Back to List",
                confirmButtonColor: "#ff6d00"
              });
            }}
            className="favorites-desktop"
          />
        </div>
        <p className="exercise-description">
          {description
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
          icon={<ActionFavorite />}
          onClick={() => {
            handleExercise(id, name, category, description);

            swal({
              title: `${name} added to Favorites!`,
              type: "success",
              confirmButtonText: "Back to List",
              confirmButtonColor: "#ff6d00"
            });
          }}
        />
        <br />
      </div>
    );
  }
}
export default Workout;
