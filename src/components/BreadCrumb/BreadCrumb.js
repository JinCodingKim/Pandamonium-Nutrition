import React from "react";
//React-Router
import { NavLink } from "react-router-dom";

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
            <NavLink key={location.id} className="crumb-name" to={location.url}>
              {location.name}
            </NavLink>
          );
        }
      })}
    </div>
  );
}
export default BreadCrumb;
