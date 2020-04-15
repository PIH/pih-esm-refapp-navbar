import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { mergeDeepRight } from "ramda";
import Navbar from "./navbar.component";
import {
  useConfig as mockUseConfig,
  testDefaultConfig
} from "@openmrs/esm-module-config";

describe("Navbar", () => {
  it("displays OpenMRS logo by default", () => {
    const { container } = render(<Navbar />);
    const logo: SVGElement = container.querySelector("svg use");
    expect(logo.getAttribute("href")).toEqual("#omrs-logo-partial-mono");
  });
});

describe(`Navbar config`, () => {
  it(`sets the brand logo`, () => {
    mockUseConfig.mockReturnValue(
      mergeDeepRight(testDefaultConfig, {
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
      mergeDeepRight(testDefaultConfig, {
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
