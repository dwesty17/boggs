import React from "react";

import { StoryContainer } from "./utils";

import LoadingSpinner from "../components/LoadingSpinner";

export default {
  title: "LoadingSpinner",
};

export const Basic = () => (
    <StoryContainer>
        <LoadingSpinner />
    </StoryContainer>
);
