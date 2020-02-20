import React from "react";
import { action } from "@storybook/addon-actions";
import {
    MdAdd,
    MdFavorite,
    MdPets,
    MdClear,
} from "react-icons/md";

import {RowContainer, StoryContainer} from "./utils";

import Button from "../components/Button";
import IconButton from "../components/IconButton";

export default {
  title: "Buttons",
};

export const Basic = () => (
    <StoryContainer>
        <Button onClick={action("basic#clicked")}>
            Basic
        </Button>

        <Button
            disabled={true}
            onClick={action("disabled#clicked")}
        >
            Disabled
        </Button>
    </StoryContainer>
);

export const IconButtons = () => (
    <StoryContainer>
        <RowContainer>
            <IconButton onClick={action("add14#clicked")}>
                <MdAdd size={14}/>
            </IconButton>

            <IconButton onClick={action("add18#clicked")}>
                <MdAdd size={18}/>
            </IconButton>

            <IconButton onClick={action("add22#clicked")}>
                <MdAdd size={22}/>
            </IconButton>

            <IconButton onClick={action("add26#clicked")}>
                <MdAdd size={26}/>
            </IconButton>
        </RowContainer>

        <RowContainer>
            <IconButton onClick={action("add14#clicked")}>
                <MdFavorite size={14}/>
            </IconButton>

            <IconButton onClick={action("add18#clicked")}>
                <MdFavorite size={18}/>
            </IconButton>

            <IconButton onClick={action("add22#clicked")}>
                <MdFavorite size={22}/>
            </IconButton>

            <IconButton onClick={action("add26#clicked")}>
                <MdFavorite size={26}/>
            </IconButton>
        </RowContainer>

        <RowContainer>
            <IconButton onClick={action("clear14#clicked")}>
                <MdClear size={14}/>
            </IconButton>

            <IconButton onClick={action("clear18#clicked")}>
                <MdClear size={18}/>
            </IconButton>

            <IconButton onClick={action("clear22#clicked")}>
                <MdClear size={22}/>
            </IconButton>

            <IconButton onClick={action("clear26#clicked")}>
                <MdClear size={26}/>
            </IconButton>
        </RowContainer>

        <RowContainer>
            <IconButton onClick={action("pets14#clicked")}>
                <MdPets size={14}/>
            </IconButton>

            <IconButton onClick={action("pets18#clicked")}>
                <MdPets size={18}/>
            </IconButton>

            <IconButton onClick={action("pets22#clicked")}>
                <MdPets size={22}/>
            </IconButton>

            <IconButton onClick={action("pets26#clicked")}>
                <MdPets size={26}/>
            </IconButton>
        </RowContainer>
    </StoryContainer>
);
