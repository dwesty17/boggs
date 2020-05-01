import React from "react";

import { Color } from "../../styles";
import { SpacedGroup } from "../SpacedGroup";

import Button from "./Button";

export default {
    title: 'reel-ui/Button',
};

export const Variations = () => (
    <SpacedGroup direction="row">
        <Button>Default</Button>
        <Button primary={true}>Primary</Button>
        <Button disabled={true}>Disabled</Button>
        <Button primary={true} disabled={true}>Disabled</Button>
    </SpacedGroup>
);
