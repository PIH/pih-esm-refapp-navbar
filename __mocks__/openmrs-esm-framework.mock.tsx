import React from "react";
import { of } from "rxjs";
import { mock__defaultConfig } from "./default_config";

window.openmrsBase = "/openmrs";
window.getOpenmrsSpaBase = () => "/openmrs/spa";

export const openmrsFetch = jest.fn().mockReturnValue(new Promise(() => {}));

export const openmrsObservableFetch = jest
  .fn()
  .mockReturnValue(of({ data: { results: [] } }));

export const getCurrentUser = jest
  .fn()
  .mockImplementation(({ includeAuthStatus }) => {
    if (includeAuthStatus) {
      return of({
        user: { display: "admin" },
        sessionLocation: { display: "Earth" },
      });
    } else {
      return of({ display: "admin" });
    }
  });

export function createErrorHandler() {
  return function errorHandler(err) {
    console.log(`Received error ${err}`, err.stack);
  };
}

export const defineConfigSchema = jest.fn();

export const validators = {
  isBoolean: jest.fn(),
  isString: jest.fn(),
};

export const useConfig = jest.fn().mockReturnValue(mock__defaultConfig);

export const ModuleNameContext = React.createContext("fake-module-config");

export const ConfigurableLink = jest
  .fn()
  .mockImplementation((config: { to: string; children: React.ReactNode }) => (
    <a href={config.to}>{config.children}</a>
  ));

export const interpolateUrl = (url) =>
  url
    .replace("${openmrsBase}", window.openmrsBase)
    .replace("${openmrsSpaBase}", window.getOpenmrsSpaBase());
