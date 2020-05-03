import React from "react";

import { SpacedGroup } from "../SpacedGroup";
import { Text } from "../typography";

import Button from "./Button";

export default {
    title: "money-ui/Button",
};

export const Variations = () => (
    <SpacedGroup>
        <SpacedGroup>
            <Text>Small</Text>
            <SpacedGroup direction="row">
                <Button size="small">Default</Button>
                <Button size="small" primary={true}>Primary</Button>
                <Button size="small" disabled={true}>Disabled</Button>
                <Button size="small" primary={true} disabled={true}>Disabled</Button>
            </SpacedGroup>
        </SpacedGroup>

        <SpacedGroup>
            <Text>Normal</Text>
            <SpacedGroup direction="row">
                <Button>Default</Button>
                <Button primary={true}>Primary</Button>
                <Button disabled={true}>Disabled</Button>
                <Button primary={true} disabled={true}>Disabled</Button>
            </SpacedGroup>
        </SpacedGroup>


        <SpacedGroup>
            <Text>Large</Text>
            <SpacedGroup direction="row">
                <Button size="large">Default</Button>
                <Button size="large" primary={true}>Primary</Button>
                <Button size="large" disabled={true}>Disabled</Button>
                <Button size="large" primary={true} disabled={true}>Disabled</Button>
            </SpacedGroup>
        </SpacedGroup>
    </SpacedGroup>
);
