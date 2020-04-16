import React from "react";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { defineConfigSchema, validators } from "@openmrs/esm-module-config";
import Navbar from "./navbar/navbar.component";

defineConfigSchema("@pih/esm-refapp-navbar", {
  links: {
    home: {
      url: {
        default: (window as any).openmrsBase
      }
    },
    account: {
      url: {
        default:
          (window as any).openmrsBase + "/adminui/myaccount/myAccount.page"
      }
    },
    logoutRedirect: {
      url: {
        default: (window as any).openmrsBase
      }
    }
  },
  brand: {
    src: {
      default: null,
      description:
        "A path or URL to an image. Defaults to the OpenMRS SVG sprite."
    },
    alt: {
      default: "OpenMRS",
      description: "Alt text, shown if the image fails to load"
    }
  }
});

function Root(props) {
  return <Navbar></Navbar>;
}
export default openmrsRootDecorator({
  featureName: "Refapp Navbar",
  moduleName: "@pih/esm-refapp-navbar"
})(Root);
