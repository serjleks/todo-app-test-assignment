import { AppBanner } from "../AppBanner";

const logMock = jest.spyOn(console, "log").mockImplementation();

describe("AppBanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    logMock.mockRestore();
  });

  test("should show console output", () => {
    const log = jest.spyOn(console, "log");

    AppBanner();

    expect(log).toBeCalled();
  });
});
