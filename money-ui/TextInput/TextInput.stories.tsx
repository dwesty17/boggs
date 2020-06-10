import React from "react";
import {action} from "@storybook/addon-actions";

import {SpacedGroup} from "../SpacedGroup";

import TextInput from "./TextInput";

export default {
    title: "money-ui/TextInput",
};

export const Default = () => (
    <SpacedGroup>
        <TextInput
            placeholder="Input here"
            onChange={action("TextInput1#onChange")}
        />

        <TextInput
            placeholder="Input here"
            hint="With a helpful hint here"
            onChange={action("TextInput2#onChange")}
        />
    </SpacedGroup>
);

export const Private = () => (
    <SpacedGroup>
        <TextInput
            private={true}
            placeholder="Hidden input"
            onChange={action("TextInput1#onChange")}
        />

        <TextInput
            private={true}
            placeholder="Hidden input"
            defaultValue="password"
            onChange={action("TextInput2#onChange")}
        />
    </SpacedGroup>
);

export const CustomWidths = () => (
    <SpacedGroup>
        <TextInput
            fullWidth={true}
            placeholder="full width"
            onChange={action("TextInput1#onChange")}
        />

        <TextInput
            width={100}
            placeholder="100px"
            onChange={action("TextInput2#onChange")}
        />

        <TextInput
            width={200}
            placeholder="200px"
            onChange={action("TextInput3#onChange")}
        />

        <TextInput
            width={300}
            placeholder="300px"
            onChange={action("TextInput4#onChange")}
        />

        <TextInput
            width={400}
            placeholder="400px"
            onChange={action("TextInput5#onChange")}
        />
    </SpacedGroup>
);

export const ErrorState = () => (
    <SpacedGroup>
        <TextInput
            placeholder="Input here"
            error="With a helpful error message"
            onChange={action("TextInput#onChange")}
        />
    </SpacedGroup>
);
