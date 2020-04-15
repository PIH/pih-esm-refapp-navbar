import React, { useState } from "react";
import { Trans } from "react-i18next";
import { useConfig } from "@openmrs/esm-module-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import style from "./navbar.css";

export default function Navbar(props) {
  const config = useConfig();

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
      <div>
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
