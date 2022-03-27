const MESSAGE_TEXT = "ToDo App";

export const AppBanner = (): void => {
  console.log(
    "%c%s",
    `
      font-size: 12;
      color: #fff;
      background: #405DF1;
      padding: 16px;
      padding-right: 100px;
    `,
    `${MESSAGE_TEXT}`
  );
};
