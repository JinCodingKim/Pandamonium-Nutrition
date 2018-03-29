import React from "react";
//Material-UI
import HardwareKeyboardArrowRight from "material-ui/svg-icons/hardware/keyboard-arrow-right";
//React-Router
import { NavLink } from "react-router-dom";
//Local
import "./BreadCrumb.css";

function BreadCrumb({ trail }) {
  return (
    <div className="crumbs-container">
      {trail.map(location => {
        if (location.id === trail.length) {
          return (
            <div key={location.id} className="crumb-name">
              {location.name}
            </div>
          );
        } else {
          return (
            <div key={location.id} className="crumbs-sub-container">
              <NavLink className="crumb-name-link" to={location.url}>
                {location.name}
              </NavLink>
              <HardwareKeyboardArrowRight className="crumb-arrow" />
            </div>
          );
        }
      })}
    </div>
  );
}
export default BreadCrumb;
