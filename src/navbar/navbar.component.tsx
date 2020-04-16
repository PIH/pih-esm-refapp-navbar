import React, { useState } from "react";
import { Trans } from "react-i18next";
import { useConfig } from "@openmrs/esm-module-config";
import { getCurrentUser } from "@openmrs/esm-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import style from "./navbar.css";

export default function Navbar(props) {
  const config = useConfig();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const sub = getCurrentUser().subscribe(user => setUser(user));
    return () => sub.unsubscribe();
  }, []);

  return (
    <header className={style.navbar}>
      <div className={`omrs-type-title-4 ${style.brand}`}>
        <a href={config.links.home.url}>
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
          {user && user.display}
        </div>
        <div>
          <a
            className={style.navbarLink}
            href={`${
              (window as any).openmrsBase
            }/appui/header/logout.action?successUrl=${
              config.links.logoutRedirect.url
            }`}
          >
            <Trans id="logout">Logout</Trans>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </a>
        </div>
      </div>
    </header>
  );
}
