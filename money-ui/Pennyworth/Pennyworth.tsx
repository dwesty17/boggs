import React from "react";
import styled from "styled-components";

import { Color, Font } from "../../styles";

interface Props {
	size?: number;
	color?: string;
}

const Pennyworth: React.FC<Props> = (props) => {
  return (
    <Text {...props}>Pennyworth</Text>
  );
};

const Text = styled.p<Props>`
  font-family: ${Font.Lobster};
  font-size: ${(props) => props.size || 50}px;
  margin: 0;
  padding: 0;
  color: ${(props) => props.color || Color.GovernorsBay};
`;

export default Pennyworth;
