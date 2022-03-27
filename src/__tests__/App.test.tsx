import { App } from "../App";
import ReactDOM from "react-dom";

const ReactDOMMock = jest.spyOn(ReactDOM, "render").mockImplementation();

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should be defined", () => {
    const app = new App();

    expect(app).toBeDefined();
  });

  test("should start app", () => {
    const app = new App();
    const render = jest.spyOn(App.prototype, "render");

    app.run();

    expect(render).toHaveBeenCalledTimes(1);
  });

  test("should render", () => {
    const app = new App();

    app.render();

    expect(ReactDOMMock).toBeCalled();
  });
});
