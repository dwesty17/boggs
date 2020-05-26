import React from "react";
import styled from "styled-components";

import { Button } from "../Button";
import { Header, Text } from "../typography";
import { SpacedGroup } from "../SpacedGroup";

import { Card } from "./Card";

export default {
    title: "money-ui/Card",
};

export const Default = () => (
    <Card width={200}>
        <SpacedGroup alignment="center">
            <Header>Header</Header>

            <Body>Card components are a little bit raised over the background.</Body>

            <Button primary={true} fullWidth={true}>
                Button
            </Button>
        </SpacedGroup>
    </Card>
);

const Body = styled(Text)`
  margin-bottom: 15px;
`;
