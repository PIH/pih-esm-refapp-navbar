import React from "react";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { defineConfigSchema, validators } from "@openmrs/esm-module-config";

defineConfigSchema("pih-esm-refapp-navbar", {
  displayGreeting: {
    validators: [validators.isBoolean],
    default: true
  }
});

function Root(props) {
  return (
    <div>Hey</div>
  );
}
export default openmrsRootDecorator({
  featureName: "Refapp Navbar",
  moduleName: "pih-esm-refapp-navbar"
})(Root);
