import { isUrl, Type } from "@openmrs/esm-framework";

export const configSchema = {
  links: {
    home: {
      url: {
        _type: Type.String,
        _validators: [isUrl],
        _default: "${openmrsBase}",
      },
    },
    account: {
      url: {
        _type: Type.String,
        _validators: [isUrl],
        _default: "${openmrsBase}/adminui/myaccount/myAccount.page",
      },
    },
    logoutRedirect: {
      url: {
        _type: Type.String,
        _validators: [isUrl],
        _default: "${openmrsBase}",
      },
    },
  },
  brand: {
    src: {
      _type: Type.String,
      _validators: [isUrl],
      _default: null,
      _description:
        "A path or URL to an image. Defaults to the OpenMRS SVG sprite.",
    },
    alt: {
      _type: Type.String,
      _default: "OpenMRS",
      _description: "Alt text, shown if the image fails to load",
    },
  },
};
