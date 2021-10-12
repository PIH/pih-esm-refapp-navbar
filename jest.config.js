module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "@openmrs/esm-framework":
      "<rootDir>/__mocks__/openmrs-esm-framework.mock.tsx",
    "\\.(css)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
};
