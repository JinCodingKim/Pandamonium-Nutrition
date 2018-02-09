import React from "react";

const MTTFList = props => {
  let chest = props.mttf
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

  let back = props.mttf
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

  let shoulder = props.mttf
    .filter(exercise => exercise.category === 13)
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
  let randShoulder = shoulder[Math.floor(Math.random() * shoulder.length)];

  let arms = props.mttf
    .filter(exercise => exercise.category === 8)
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
  let randArms = arms[Math.floor(Math.random() * arms.length)];

  let abs = props.mttf
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

  let legs = props.mttf
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

  let calves = props.mttf
    .filter(exercise => exercise.category === 14)
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
  let randCalves = calves[Math.floor(Math.random() * calves.length)];

  return (
    <section>
      <div>
        <h1 className="days">{props.days[0]}</h1>
        {randChest}
        {randBack}
        {randShoulder}
        {randArms}
        {randAbs}
      </div>
      <div>
        <h1 className="days">{props.days[1]}</h1>
        {randLegs}
        {randCalves}
        {randAbs}
      </div>
      <div>
        <h1 className="days">{props.days[2]}</h1>
        {randChest}
        {randBack}
        {randShoulder}
        {randArms}
        {randAbs}
      </div>
      <div>
        <h1 className="days">{props.days[3]}</h1>
        {randLegs}
        {randCalves}
        {randAbs}
      </div>
    </section>
  );
};
export default MTTFList;
