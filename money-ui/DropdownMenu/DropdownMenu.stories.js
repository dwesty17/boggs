import React from "react";
import { action } from "@storybook/addon-actions";

import { SpacedGroup } from "../SpacedGroup";

import DropdownMenu from "./DropdownMenu";

export default {
    title: "money-ui/DropdownMenu",
};

export const Variations = () => (
    <SpacedGroup>
        <DropdownMenu
            options={[
                { value: 0, name: "Option 1" },
                { value: 1, name: "Option 2" },
                { value: 2, name: "Option 3" },
            ]}
            onChange={action("Dropdown 1 value change")}
        />

        <DropdownMenu
            placeholder="Custom select message"
            options={[
                { value: 0, name: "Option 1" },
                { value: 1, name: "Option 2" },
                { value: 2, name: "Option 3" },
            ]}
            onChange={action("Dropdown 2 value change")}
        />

        <DropdownMenu
            value={0}
            options={[
                { value: 0, name: "Option 1" },
                { value: 1, name: "Option 2" },
                { value: 2, name: "Option 3" },
            ]}
            onChange={action("Dropdown 3 value change")}
        />
    </SpacedGroup>
);
