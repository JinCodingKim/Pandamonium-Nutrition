import React from "react";

const MWFList = props => {
  let chest = props.mwf
    .filter(exercise => exercise.category === 11)
    .map(exercise => {
      return (
        <div className="ex" key={exercise.id}>
          <h2 className="ex-title"> {exercise.name}</h2>
          <div className="ex-description">
            {" "}
            {exercise.description
              .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "")
              .replace(/(<li[^>]+?>|<li>|<\/li>)/gim, "")
              .replace(/(<ol[^>]+?>|<ol>|<\/ol>)/gim, "")
              .replace(/(<ul[^>]+?>|<ul>|<\/ul>)/gim, "")
              .replace(/(<em[^>]+?>|<em>|<\/em>)/gim, "")
              .replace(/(<strong[^>]+?>|<strong>|<\/strong>)/gim, "")}{" "}
          </div>
          <br />
        </div>
      );
    });
  let randChest = chest[Math.floor(Math.random() * chest.length)];

  let back = props.mwf
    .filter(exercise => exercise.category === 12)
    .map(exercise => {
      return (
        <div className="ex" key={exercise.id}>
          <h2 className="ex-title"> {exercise.name}</h2>
          <div className="ex-description">
            {" "}
            {exercise.description
              .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "")
              .replace(/(<li[^>]+?>|<li>|<\/li>)/gim, "")
              .replace(/(<ol[^>]+?>|<ol>|<\/ol>)/gim, "")
              .replace(/(<ul[^>]+?>|<ul>|<\/ul>)/gim, "")
              .replace(/(<em[^>]+?>|<em>|<\/em>)/gim, "")
              .replace(/(<strong[^>]+?>|<strong>|<\/strong>)/gim, "")}{" "}
          </div>
          <br />
        </div>
      );
    });
  let randBack = back[Math.floor(Math.random() * back.length)];

  let abs = props.mwf
    .filter(exercise => exercise.category === 10)
    .map(exercise => {
      return (
        <div className="ex" key={exercise.id}>
          <h2 className="ex-title"> {exercise.name}</h2>
          <div className="ex-description">
            {" "}
            {exercise.description
              .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "")
              .replace(/(<li[^>]+?>|<li>|<\/li>)/gim, "")
              .replace(/(<ol[^>]+?>|<ol>|<\/ol>)/gim, "")
              .replace(/(<ul[^>]+?>|<ul>|<\/ul>)/gim, "")
              .replace(/(<em[^>]+?>|<em>|<\/em>)/gim, "")
              .replace(/(<strong[^>]+?>|<strong>|<\/strong>)/gim, "")}{" "}
          </div>
          <br />
        </div>
      );
    });
  let randAbs = abs[Math.floor(Math.random() * abs.length)];

  let legs = props.mwf
    .filter(exercise => exercise.category === 9)
    .map(exercise => {
      return (
        <div className="ex" key={exercise.id}>
          <h2 className="ex-title"> {exercise.name}</h2>
          <div className="ex-description">
            {" "}
            {exercise.description
              .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "")
              .replace(/(<li[^>]+?>|<li>|<\/li>)/gim, "")
              .replace(/(<ol[^>]+?>|<ol>|<\/ol>)/gim, "")
              .replace(/(<ul[^>]+?>|<ul>|<\/ul>)/gim, "")
              .replace(/(<em[^>]+?>|<em>|<\/em>)/gim, "")
              .replace(/(<strong[^>]+?>|<strong>|<\/strong>)/gim, "")}{" "}
          </div>
          <br />
        </div>
      );
    });
  let randLegs = legs[Math.floor(Math.random() * legs.length)];

  return (
    <section>
      <div>
        <h1 className="days">{props.days[0]}</h1>
        {randChest}
        {randBack}
        {randLegs}
        {randAbs}
      </div>
      <div>
        <h1 className="days">{props.days[1]}</h1>
        {randChest}
        {randBack}
        {randLegs}
        {randAbs}
      </div>
      <div>
        <h1 className="days">{props.days[2]}</h1>
        {randChest}
        {randBack}
        {randLegs}
        {randAbs}
      </div>
    </section>
  );
};
export default MWFList;
