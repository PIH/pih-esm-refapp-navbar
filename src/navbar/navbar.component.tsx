import React, { useState } from "react";
import { Trans } from "react-i18next";
import { getCurrentUser, openmrsFetch } from "@openmrs/esm-api";
import { useConfig } from "@openmrs/esm-module-config";
import LocationSelect from "../location-select/location-select.component";
import style from "./navbar.css";

export default function Navbar(props) {
  const config = useConfig();
  const [user, setUser] = React.useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [sessionLocation, setSessionLocation] = useState({ display: "" });

  React.useEffect(() => {
    const sub = getCurrentUser().subscribe(user => setUser(user));
    return () => sub.unsubscribe();
  }, []);

  console.log(user);
  return (
    <header className={style.navbar}>
      <div className="omrs-type-title-4">
        <a href={config.links.home.url}>
          {config.brand.img ? (
            <img alt={config.brand.alt} src={config.brand.img} />
          ) : (
            <svg role="img" width="10rem">
              <use href="#omrs-logo-partial-mono"></use>
            </svg>
          )}
        </a>
      </div>
      <div className={style.menu}>
        <button
          onClick={() => {
            setIsUserMenuOpen(!isUserMenuOpen);
          }}
        >
          <i className="icon-user small" />
          {user && (user.person.display || user.display) }

          {isUserMenuOpen ? (
            <i className="icon-caret-up link appui-toggle" />
          ) : (
            <i className="icon-caret-down appui-icon-caret-down link" />
          )}
          {isUserMenuOpen && (
            <ul id="user-account-menu">
              <li>
                <a href={config.links.account.url}>
                    <Trans id="account">Account</Trans>
                </a>
              </li>
            </ul>
          )}
        </button>
        <div className="change-location">
          <a
            onClick={() => {
              this.toggleState("locationDropdown");
            }}
          >
            <i className="icon-map-marker small" />
            <span id="selected-location">{sessionLocation.display}</span>

            <i className="link icon-caret-down" />
          </a>
          {isLocationMenuOpen && (
            <LocationSelect setSessionLocation={setSessionLocation} />
          )}
        </div>
        <div className="logout">
          <a
            href={`/${
              (window as any).openmrsBase
            }/appui/header/logout.action?successUrl=${
              config.links.logoutRedirect.url
            }`}
          >
            <Trans id="logout">Logout</Trans>
            <i className="icon-signout small" />
          </a>
        </div>
      </div>
    </header>
  );
}
