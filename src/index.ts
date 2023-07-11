import { defineConfigSchema, getAsyncLifecycle } from "@openmrs/esm-framework";
import { configSchema } from "./configSchema";

const moduleName = "@pih/esm-refapp-navbar-app";
const options = {
  featureName: "Refapp Navbar",
  moduleName,
};

const backendDependencies = { appui: "^1.0.0" };

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export const root = getAsyncLifecycle(
  () => import("./root.component"),
  options
);

export function startupApp() {
  defineConfigSchema("@pih/esm-refapp-navbar-app", configSchema);
}
