import {
  defineConfigSchema,
  Type,
  getAsyncLifecycle,
  isUrl,
} from "@openmrs/esm-framework";
import { configSchema } from "./configSchema";

const backendDependencies = { appui: "^1.0.0" };

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

function setupOpenMRS() {
  defineConfigSchema("@pih/esm-refapp-navbar-app", configSchema);

  const moduleName = "@pih/esm-refapp-navbar-app";

  const options = {
    featureName: "Refapp Navbar",
    moduleName,
  };

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import("./root.component"), options),
        route: () => true,
        order: 0,
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
