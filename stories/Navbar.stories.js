import React from "react";
import { action } from "@storybook/addon-actions";

import {StoryContainer} from "./utils";

import NavBar from "../components/NavBar";

export default {
  title: "NavBar",
};

export const Basic = () => (
    <StoryContainer noPadding={true}>
        <NavBar onSignOut={action("NavBar_signOut#clicked")}/>
    </StoryContainer>
);
