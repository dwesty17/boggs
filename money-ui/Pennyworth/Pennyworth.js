import React from "react";
import styled from "styled-components";

import { Color, Font } from "../../styles";

const Pennyworth = (props) => {
  return (
    <Text {...props}>Pennyworth</Text>
  );
};

const Text = styled.p`
  font-family: ${Font.Lobster};
  font-size: ${(props) => props.size || 50}px;
  margin: 0;
  padding: 0;
  color: ${(props) => props.color || Color.ShipGrey};
`;

export default Pennyworth;
