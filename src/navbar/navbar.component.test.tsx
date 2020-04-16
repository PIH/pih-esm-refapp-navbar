import React from "react";
import { render } from "@testing-library/react";
import { mergeDeepRight } from "ramda";
import { of } from "rxjs";
import Navbar from "./navbar.component";
import { getCurrentUser } from "@openmrs/esm-api";
import { useConfig, testDefaultConfig } from "@openmrs/esm-module-config";

const mockGetCurrentUser = getCurrentUser as jest.Mock;
const mockUseConfig = useConfig as jest.Mock;

it("displays everything expected", () => {
  const { container, queryByText } = render(<Navbar />);
  const logo: SVGElement = container.querySelector("svg use");
  expect(logo.getAttribute("href")).toEqual("#omrs-logo-partial-mono");
  const username = "admin";
  const location = "Narnia";
  expect(queryByText(username)).not.toBeNull();
  expect(queryByText(location)).not.toBeNull();
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
