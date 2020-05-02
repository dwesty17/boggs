import { create } from "@storybook/theming/create";

import { Color } from "../styles";

export default create({
  base: "light",

  brandTitle: "Pennyworth",
  brandUrl: "https://github.com/dwesty17/pennyworth",
  brandImage: "logos/text-logo-ship-gray.png",

  appBg: Color.White,
  appContentBg: Color.White,
  appBorderColor: Color.White,
  appBorderRadius: 4,
  barBg: Color.GovernorsBay,
});
