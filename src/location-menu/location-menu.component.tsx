import React from "react";
import { createErrorHandler } from "@openmrs/esm-error-handling";
import {
  getLoginLocations,
  setSessionLocation
} from "../location-menu/location-menu.resource";
import style from "./location-menu.css";

export default function LocationMenu(props: LocationMenuProps) {
  const [loginLocations, setLoginLocations] = React.useState([]);
  const [newLocation, setNewLocation]: [
    Location,
    (l: Location) => void
  ] = React.useState(null);

  React.useEffect(() => {
    const sub = getLoginLocations().subscribe(
      locations => setLoginLocations(locations),
      createErrorHandler()
    );
    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    const abortController = new AbortController();
    if (newLocation) {
      setSessionLocation(newLocation.uuid, abortController)
        .then(() => props.onSetLocation(newLocation))
        .catch(createErrorHandler())
        .finally(() => setNewLocation(null));
    }
    return () => abortController.abort();
  }, [newLocation]);

  const RadioInput = (option: Location) => (
    <button
      key={"refapp-navbar-" + option.uuid}
      id={option.uuid}
      name="location"
      onClick={evt => setNewLocation(option)}
    >
      {option.display}
    </button>
  );

  return <div className={style.menu}>{loginLocations.map(RadioInput)}</div>;
}

interface LocationMenuProps {
  onSetLocation: (location: Location) => void;
}

type Location = {
  uuid: string;
  display: string;
};
