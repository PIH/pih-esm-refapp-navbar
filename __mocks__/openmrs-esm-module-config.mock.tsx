import React from "react";

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
