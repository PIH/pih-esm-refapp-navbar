import React from "react";
import { of } from "rxjs";

export const openmrsFetch = jest.fn().mockReturnValue(new Promise(() => {}));

export const openmrsObservableFetch = jest.fn().mockReturnValue(of({}));

export const getCurrentUser = jest
  .fn()
  .mockImplementation(({ includeAuthStatus }) => {
    if (includeAuthStatus) {
      return of({
        user: { display: "admin" },
        sessionLocation: { display: "Earth" }
      });
    } else {
      return of({ display: "admin" });
    }
  });

export function createErrorHandler() {
  return function errorHandler(err) {
    console.log(`Received error ${err}`);
  };
}

export const defineConfigSchema = jest.fn();

export const validators = {
  isBoolean: jest.fn(),
  isString: jest.fn()
};

export const mock__defaultConfig = {
  links: {
    home: {
      url: "/home"
    },
    account: {
      url: "/account"
    },
    logoutRedirect: {
      url: "/home"
    }
  },
  brand: {
    src: null,
    alt: "OpenMRS"
  }
};

export const useConfig = jest.fn().mockReturnValue(mock__defaultConfig);

export const ModuleNameContext = React.createContext("fake-module-config");

export const ConfigurableLink = jest
  .fn()
  .mockImplementation((config: { to: string; children: React.ReactNode }) => (
    <a href={config.to}>{config.children}</a>
  ));
