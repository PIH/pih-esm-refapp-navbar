import "@testing-library/jest-dom/extend-expect";

jest.mock("@openmrs/esm-framework", () => {
  const originalModule = jest.requireActual("@openmrs/esm-framework");

  return {
    ...originalModule,
    useConfig: jest.fn(() => {
      return {
        links: {
          home: {
            url: "${openmrsBase}",
          },
          account: {
            url: "${openmrsBase}/adminui/myaccount/myAccount.page",
          },
          logoutRedirect: {
            url: "${openmrsBase}",
          },
        },
        brand: {
          src: null,
          alt: "OpenMRS",
        },
      };
    }),
  };
});

window.getOpenmrsSpaBase = () => "openmrs/spa";
