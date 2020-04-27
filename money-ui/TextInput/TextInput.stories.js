import React from "react";

import { SpacedGroup } from "../SpacedGroup";

import TextInput from "./TextInput";

export default {
    title: 'reel-ui/TextInput',
};

export const Default = () => (
    <TextInput placeholder="Input here"/>
);

export const Private = () => (
    <SpacedGroup>
        <TextInput
            private={true}
            placeholder="Hidden input"
        />

        <TextInput
            private={true}
            placeholder="Hidden input"
            defaultValue="password"
        />
    </SpacedGroup>
);

export const CustomWidths = () => (
    <SpacedGroup>
        <TextInput fullWidth={true} placeholder="full width"/>
        <TextInput width={100} placeholder="100px"/>
        <TextInput width={200} placeholder="200px"/>
        <TextInput width={300} placeholder="300px"/>
        <TextInput width={400} placeholder="400px"/>
    </SpacedGroup>
);