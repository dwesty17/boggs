import React from "react";

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
        />

        <DropdownMenu
            placeholder="Custom select message"
            options={[
                { value: 0, name: "Option 1" },
                { value: 1, name: "Option 2" },
                { value: 2, name: "Option 3" },
            ]}
        />

        <DropdownMenu
            options={[
                { value: 0, name: "Option 1" },
                { value: 1, name: "Option 2", selected: true },
                { value: 2, name: "Option 3" },
            ]}
        />
    </SpacedGroup>
);
