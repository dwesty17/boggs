import React from "react";

import { SpacedGroup } from "../SpacedGroup";

import EditableText from "./EditableText";

export default {
    title: "money-ui/EditableText",
};

export const Default = () => (
    <SpacedGroup>
        <EditableText
            value="This text is editable"
        />
        <EditableText
            value="Title styled text is supported as well"
            typography="title"
        />
        <EditableText
            value="So are headers"
            typography="header"
        />
        <EditableText
            value="And captions"
            typography="caption"
        />
    </SpacedGroup>
);
