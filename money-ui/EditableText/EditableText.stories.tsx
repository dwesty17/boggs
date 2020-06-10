import React from "react";
import {action} from "@storybook/addon-actions";

import { SpacedGroup } from "../SpacedGroup";

import EditableText from "./EditableText";

export default {
    title: "money-ui/EditableText",
};

export const Default = () => (
    <SpacedGroup>
        <EditableText
            value="This text is editable"
            onChange={action("EditableText1#onChange")}
        />
        <EditableText
            value="Title styled text is supported as well"
            typography="title"
            onChange={action("EditableText2#onChange")}
        />
        <EditableText
            value="So are headers"
            typography="header"
            onChange={action("EditableText3#onChange")}
        />
        <EditableText
            value="And captions"
            typography="caption"
            onChange={action("EditableText4#onChange")}
        />
    </SpacedGroup>
);
