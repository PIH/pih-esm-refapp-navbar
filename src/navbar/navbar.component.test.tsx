import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, wait, RenderResult } from "@testing-library/react";
import { mergeDeepRight } from "ramda";
import { of } from "rxjs";
import Navbar from "./navbar.component";
import { getCurrentUser } from "@openmrs/esm-api";
import { useConfig, mock__defaultConfig } from "@openmrs/esm-module-config";
import { getLoginLocations } from "../location-menu/location-menu.resource";

const mockGetCurrentUser = getCurrentUser as jest.Mock;
const mockUseConfig = useConfig as jest.Mock;
jest.mock("../location-menu/location-menu.resource");
const mockGetLoginLocations = getLoginLocations as jest.Mock;
const loginLocations = [
  { uuid: "111", display: "Earth" },
  { uuid: "222", display: "Mars" }
];
mockGetLoginLocations.mockReturnValue(of(loginLocations));

(window as any).openmrsBase = "/openmrs";
// hack around js-dom to make navigation testable
delete window.location;
//@ts-ignore
window.location = { href: "/openmrs/start" };

describe("Navbar", () => {
  let ui: RenderResult, logo: SVGElement;
  beforeEach(() => {
    ui = render(<Navbar />);
    logo = ui.container.querySelector("svg use");
  });

  it("displays everything expected", () => {
    expect(logo.getAttribute("href")).toEqual("#omrs-logo-partial-mono");
    const username = "admin";
    const location = "Earth";
    expect(ui.queryByText(username)).not.toBeNull();
    const locationButton = ui.queryByText(location, {
      selector: ".locationButton"
    });
    expect(locationButton).toBeVisible();
  });

  it("opens the location picker", () => {
    const locationButton = ui.container.querySelector(".fa-map-marker-alt");
    fireEvent.click(locationButton);
    expect(ui.queryByText("Mars")).toBeVisible();
  });
});

describe(`Navbar config`, () => {
  it(`sets the brand logo`, () => {
    mockUseConfig.mockReturnValue(
      mergeDeepRight(mock__defaultConfig, {
        brand: {
          src: "my-logo.png",
          alt: "My Org"
        }
      })
    );
    const { getByAltText } = render(<Navbar />);
    const logo = getByAltText("My Org");
    expect(logo).toMatchObject({
      src: expect.stringMatching(/my-logo.png$/)
    });
  });

  it("sets the logout redirect URL", async () => {
    mockUseConfig.mockReturnValue(
      mergeDeepRight(mock__defaultConfig, {
        links: {
          logoutRedirect: {
            url: "/my-home"
          }
        }
      })
    );
    const { getByText } = render(<Navbar />);
    const logout = getByText("Logout");
    expect(logout).toMatchObject({
      href: expect.stringMatching("successUrl=/my-home")
    });
  });
});
