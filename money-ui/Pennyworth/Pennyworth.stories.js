import React from "react";
import styled from "styled-components";

import { Color } from "../../styles";
import { SpacedGroup } from "../SpacedGroup";

import Pennyworth from "./Pennyworth";

export default {
  title: "money-ui/Pennyworth",
};

export const Variations = () => (
  <SpacedGroup alignment="center">
    <Pennyworth/>

    <Pennyworth color={Color.GovernorsBay}/>

    <DarkBackground>
      <Pennyworth color={Color.White}/>
    </DarkBackground>

    <DarkBackground color={Color.GovernorsBay}>
      <Pennyworth color={Color.White}/>
    </DarkBackground>
  </SpacedGroup>
);

const DarkBackground = styled.div`
  padding: 0 10px;
  background-color: ${(props) => props.color || Color.ShipGrey};
`;
