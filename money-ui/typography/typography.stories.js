import React from "react";

import { Color } from "../../styles";
import { SpacedGroup } from "../SpacedGroup";

import { Caption, Text } from "./typography";

export default {
    title: 'reel-ui/typography',
};

export const Default = () => (
    <SpacedGroup>
        <Text>This is the default Pennyworth text.</Text>
        <Text size={20}>But we can change the size of the text.</Text>
        <Text color={Color.GovernorsBay}>Or the color.</Text>
        <Text size={14} color={Color.Arapawa}>Or both.</Text>
    </SpacedGroup>
);

export const Captions = () => (
    <SpacedGroup>
        <Caption>Captions are smaller than regular text.</Caption>
        <Caption color={Color.Crail}>We can change the color of them.</Caption>
    </SpacedGroup>
);
