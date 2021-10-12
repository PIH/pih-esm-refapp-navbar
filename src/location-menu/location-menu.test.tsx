import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { of } from "rxjs";
import LocationMenu from "./location-menu.component";
import {
  getLoginLocations,
  setSessionLocation,
} from "./location-menu.resource";

const loginLocations = [
  { uuid: "111", display: "Earth" },
  { uuid: "222", display: "Mars" },
  { uuid: "333", display: "Jupiter" },
];
jest.mock("../location-menu/location-menu.resource", () => ({
  getLoginLocations: jest.fn(),
  setSessionLocation: jest.fn(),
}));
const mockedGetLoginLocations = getLoginLocations as jest.Mock;
const mockedSetSessionLocation = setSessionLocation as jest.Mock;
mockedGetLoginLocations.mockReturnValue(of(loginLocations));
mockedSetSessionLocation.mockResolvedValue({});

describe("LocationMenu", () => {
  let ui: RenderResult, logo: SVGElement;
  const mockOnSetLocation = jest.fn();
  beforeEach(() => {
    mockedSetSessionLocation.mockClear();
    ui = render(<LocationMenu onSetLocation={mockOnSetLocation} />);
  });

  it("displays the login locations", () => {
    expect(ui.getByText("Earth")).toBeVisible();
    expect(ui.getByText("Mars")).toBeVisible();
    expect(ui.getByText("Jupiter")).toBeVisible();
  });

  it("sets the clicked location and calls the onSetLocation function", async () => {
    fireEvent.click(ui.getByText("Jupiter"));
    expect(mockedSetSessionLocation).toHaveBeenCalledTimes(1);
    expect(mockedSetSessionLocation.mock.calls[0][0]).toBe("333");
    await waitFor(() =>
      expect(mockOnSetLocation).toHaveBeenCalledWith(loginLocations[2])
    );
  });
});
