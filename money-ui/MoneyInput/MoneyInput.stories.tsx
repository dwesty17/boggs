import React from "react";
import {action} from "@storybook/addon-actions";

import MoneyInput from "./MoneyInput";

export default {
    title: "money-ui/MoneyInput",
};

export const Default = () => (
	<MoneyInput
		placeholder="Dollar amounts only"
		onChange={action("MoneyInput1#onChange")}
	/>
);
