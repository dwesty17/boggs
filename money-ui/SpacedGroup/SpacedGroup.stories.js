import React from "react";

import { TextInput } from "../TextInput";

import SpacedGroup from "./SpacedGroup";

export default {
    title: "money-ui/SpacedGroup",
};

export const Default = () => (
    <SpacedGroup>
        <TextInput placeholder="input 1"/>
        <TextInput placeholder="input 2"/>
        <TextInput placeholder="input 3"/>
    </SpacedGroup>
);

export const LessSpace = () => (
    <SpacedGroup space={5}>
        <TextInput placeholder="input 1"/>
        <TextInput placeholder="input 2"/>
        <TextInput placeholder="input 3"/>
    </SpacedGroup>
);

export const MoreSpace = () => (
    <SpacedGroup space={30}>
        <TextInput placeholder="input 1"/>
        <TextInput placeholder="input 2"/>
        <TextInput placeholder="input 3"/>
    </SpacedGroup>
);
