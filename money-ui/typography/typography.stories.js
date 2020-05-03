import React from "react";

import { Color } from "../../styles";
import { SpacedGroup } from "../SpacedGroup";

import {
    Caption,
    Header,
    LinkText,
    Subheader,
    Text,
    Title,
} from "./typography";

export default {
    title: "money-ui/typography",
};

export const Variations = () => (
    <SpacedGroup>
        <Title>Title</Title>
        <Header>Header</Header>
        <Subheader>Subheader</Subheader>
        <Text>This is the default text</Text>
        <LinkText>Link</LinkText>
        <Caption>A small little caption</Caption>
    </SpacedGroup>
);

export const DefaultText = () => (
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

export const Links = () => (
    <SpacedGroup>
        <LinkText>Here's a link</LinkText>
    </SpacedGroup>
);
