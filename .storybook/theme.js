import { create } from "@storybook/theming/create";

import { Color } from "../styles";

export default create({
  base: "light",

  brandTitle: "Pennyworth",
  brandUrl: "https://github.com/dwesty17/pennyworth",
  // brandImage: "/img/reelcall-logo-min.png",

  // colorPrimary: Color.HippieBlue,
  // colorSecondary: Color.IceCold,
  //
  // // Typography
  // fontBase: "Open Sans, sans-serif",
  // fontCode: "monospace",
  //
  // UI
  appBg: Color.White,
  appContentBg: Color.ChinaIvory,
  appBorderColor: Color.ChinaIvory,
  appBorderRadius: 4,
  //
  // // Text colors
  // textColor: Color.Black,
  // textInverseColor: Color.ShipGrey,
  //
  // // Toolbar default and active colors
  // barTextColor: Color.White,
  // barSelectedColor: Color.ShipGrey,
  barBg: Color.GovernorsBay,
  //
  // // Form colors
  // inputBg: Color.White,
  // inputBorder: Color.ShipGrey,
  // inputTextColor: Color.ShipGrey,
  // inputBorderRadius: 4,
});
