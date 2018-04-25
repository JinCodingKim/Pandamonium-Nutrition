import React from "react";
//Loader
import LoaderSVG from "../../ball-triangle.svg";
//Local
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <img className="loader" src={LoaderSVG} alt="Loader" />
    </div>
  );
}
export default Loader;
