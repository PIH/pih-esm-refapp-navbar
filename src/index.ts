import {
  defineConfigSchema,
  Type,
  getAsyncLifecycle,
  isUrl
} from "@openmrs/esm-framework";

const backendDependencies = { appui: "1.0.0" };

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

function setupOpenMRS() {
  defineConfigSchema("@pih/esm-refapp-navbar-app", {
    links: {
      home: {
        url: {
          _type: Type.String,
          _validators: [isUrl],
          _default: "${openmrsBase}"
        }
      },
      account: {
        url: {
          _type: Type.String,
          _validators: [isUrl],
          _default: "${openmrsBase}/adminui/myaccount/myAccount.page"
        }
      },
      logoutRedirect: {
        url: {
          _type: Type.String,
          _validators: [isUrl],
          _default: "${openmrsBase}"
        }
      }
    },
    brand: {
      src: {
        _type: Type.String,
        _validators: [isUrl],
        _default: null,
        _description:
          "A path or URL to an image. Defaults to the OpenMRS SVG sprite."
      },
      alt: {
        _type: Type.String,
        _default: "OpenMRS",
        _description: "Alt text, shown if the image fails to load"
      }
    }
  });

  const moduleName = "@pih/esm-refapp-navbar-app";

  const options = {
    featureName: "Refapp Navbar",
    moduleName
  };

  return {
    lifecycle: getAsyncLifecycle(() => import("./root.component"), options),
    activate: () => true
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
