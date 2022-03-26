import React from "react";
import { render } from "react-dom";

const rootElementId = "root";
const mountElement = document.getElementById(rootElementId);

render(<h1>Hello, world</h1>, mountElement);
