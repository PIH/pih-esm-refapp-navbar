import React, { useState } from "react";
import style from "./location-select.css";

export default function Navbar(props) {
  const [sessionLocation, setSessionLocation] = useState({ display: "" });
  const [locations, setLocations] = useState([]);

  return (
 
              <div>
                <ul className="location-container">
                  {locations.map(location => (
                    <li
                      className={
                        location.display === sessionLocation.display
                          ? "selected"
                          : ""
                      }
                      key={location.uuid}
                      onClick={() => {
                        setSessionLocation(location.uuid);
                        this.toggleState("locationDropdown", false);
                      }}
                      role="button"
                    >
                      {location.display}
                    </li>
                  ))}
                </ul>
              </div>
   
  );
}
