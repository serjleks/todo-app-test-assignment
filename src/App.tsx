import React from "react";
import { render } from "react-dom";

import { AppBanner } from "./helpers/AppBanner";

import "styles/style.scss";
import { AppLayout } from "./layouts/AppLayout/AppLayout";

export class App {
  public run() {
    AppBanner();
    this.render();
  }

  public render() {
    const rootElementId = "root";
    const mountElement = document.getElementById(rootElementId);

    const appContainer = (
      <>
        <AppLayout />
      </>
    );

    render(appContainer, mountElement);
  }
}
