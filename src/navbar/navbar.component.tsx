/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useState } from "react";
import { Trans } from "react-i18next";
import { useConfig } from "@openmrs/esm-module-config";
import { getCurrentUser } from "@openmrs/esm-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUser,
  faMapMarkerAlt,
  faCaretDown,
  faCaretUp
} from "@fortawesome/free-solid-svg-icons";
import LocationMenu from "../location-menu/location-menu.component";

import style from "./navbar.css";

export default function Navbar(props) {
  const config = useConfig();
  const [user, setUser] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const sub = getCurrentUser({ includeAuthStatus: true }).subscribe(user => {
      setUser(user);
      if (user.user) {
        // with current esm-api there's no way to get sessionLocation type-safely
        setLocation((user as any).sessionLocation);
      }
    });
    return () => sub.unsubscribe();
  }, []);

  // console.log(user);
  return (
    <nav>
      <div className={style.navbar}>
        <div className={`omrs-type-title-4 ${style.brand}`}>
          <a href={config.links.home.url} tabIndex={1}>
            {config.brand.src ? (
              <img alt={config.brand.alt} src={config.brand.src} />
            ) : (
              <svg role="img" width="10rem">
                <use href="#omrs-logo-partial-mono"></use>
              </svg>
            )}
          </a>
        </div>
        <div className={style.menu}>
          <div className={style.user}>
            <FontAwesomeIcon icon={faUser} />
            {user && user.user && user.user.display}
          </div>
          <div>
            <button
              className={style.locationButton}
              onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
              tabIndex={2}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              {location && location.display}
              <FontAwesomeIcon
                icon={isLocationMenuOpen ? faCaretUp : faCaretDown}
                style={{ fontSize: "12px" }}
              />
            </button>
          </div>
          <div>
            <a
              className={style.navbarLink}
              href={`${
                (window as any).openmrsBase
              }/appui/header/logout.action?successUrl=${
                config.links.logoutRedirect.url
              }`}
              tabIndex={3}
            >
              <Trans id="logout">Logout</Trans>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </a>
          </div>
        </div>
      </div>
      <div
        style={isLocationMenuOpen ? {} : { display: "none" }}
        onMouseLeave={() => setIsLocationMenuOpen(false)}
      >
        <LocationMenu
          onSetLocation={l => {
            setLocation(l);
            setIsLocationMenuOpen(false);
          }}
        />
      </div>
    </nav>
  );
}
