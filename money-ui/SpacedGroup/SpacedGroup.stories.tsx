import React from "react";
import {action} from "@storybook/addon-actions";

import { TextInput } from "../TextInput";

import SpacedGroup from "./SpacedGroup";

export default {
    title: "money-ui/SpacedGroup",
};

export const Default = () => (
    <SpacedGroup>
        <TextInput
            placeholder="input 1"
            onChange={action("TextInput1#onChange")}
        />
        <TextInput 
            placeholder="input 2"
            onChange={action("TextInput2#onChange")}
        />
        <TextInput
            placeholder="input 3"
            onChange={action("TextInput3#onChange")}
        />
    </SpacedGroup>
);

export const LessSpace = () => (
    <SpacedGroup space={5}>
        <TextInput
            placeholder="input 1"
            onChange={action("TextInput1#onChange")}
        />
        <TextInput 
            placeholder="input 2"
            onChange={action("TextInput2#onChange")}
        />
        <TextInput
            placeholder="input 3"
            onChange={action("TextInput3#onChange")}
        />
    </SpacedGroup>
);

export const MoreSpace = () => (
    <SpacedGroup space={30}>
        <TextInput
            placeholder="input 1"
            onChange={action("TextInput1#onChange")}
        />
        <TextInput 
            placeholder="input 2"
            onChange={action("TextInput2#onChange")}
        />
        <TextInput
            placeholder="input 3"
            onChange={action("TextInput3#onChange")}
        />
    </SpacedGroup>
);
