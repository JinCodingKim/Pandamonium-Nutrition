// import React, { Component } from "react";
// import "./WorkoutList.css";

// class UnfilteredList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       edit: false,
//       description: this.props.exercise.description
//     };
//     this.toggleEdit = this.toggleEdit.bind(this);
//     this.save = this.save.bind(this);
//     this.changeDes = this.changeDes.bind(this);
//   }

//   toggleEdit() {
//     const { edit } = this.state;
//     this.setState({
//       edit: !edit
//     });
//   }

//   save() {
//     const { description } = this.state;
//     const { exercise: { id }, update } = this.props;
//     update(id, description);
//     this.toggleEdit();
//   }

//   changeDes(e) {
//     this.setState({
//       description: e.target.value
//     });
//   }
//   render() {
//     const { edit, description } = this.state;
//     const { destroy, exercise, index } = this.props;
//     return (
//       <div className="exercise" key={exercise.id}>
//         <h2 id="exerciseTitle">{exercise.name}</h2>

//         {!edit ? (
//           <p id="descriptionContainer">
//             {exercise.description
//               .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "")
//               .replace(/(<li[^>]+?>|<li>|<\/li>)/gim, "")
//               .replace(/(<ol[^>]+?>|<ol>|<\/ol>)/gim, "")
//               .replace(/(<ul[^>]+?>|<ul>|<\/ul>)/gim, "")
//               .replace(/(<em[^>]+?>|<em>|<\/em>)/gim, "")
//               .replace(/(<strong[^>]+?>|<strong>|<\/strong>)/gim, "")}
//           </p>
//         ) : (
//           <textarea
//             id="editContainer"
//             onChange={this.changeDes}
//             value={description}
//           />
//         )}
//         <button id="deleteButton" onClick={() => destroy(index)}>
//           Delete Exercise
//         </button>

//         {!this.state.edit && (
//           <button className="editButton" onClick={this.toggleEdit}>
//             Edit{" "}
//           </button>
//         )}
//         {this.state.edit && (
//           <button className="editButton" onClick={this.save}>
//             Save{" "}
//           </button>
//         )}
//         <br />
//       </div>
//     );
//   }
// }
// export default UnfilteredList;
