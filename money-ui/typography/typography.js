import styled from "styled-components";

import { Color, Font } from "../../styles";

export const Text = styled.p`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 18}px;
  font-weight: 400;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const Caption = styled(Text)`
  font-size: 13px;
  color: ${(props) => props.color || Color.Alto};
`;
