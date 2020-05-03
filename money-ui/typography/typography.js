import styled from "styled-components";

import { Color, Font } from "../../styles";

const DEFAULT_FONT_SIZE = 18;

export const Title = styled.p`
  font-family: ${Font.Roboto};
  font-size: ${(props) => props.size || 34}px;
  font-weight: 900;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const Header = styled.p`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 28}px;
  font-weight: 400;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const Subheader = styled.p`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 20}px;
  font-weight: 600;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const Text = styled.p`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || DEFAULT_FONT_SIZE}px;
  font-weight: 400;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const LinkText = styled.a`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || DEFAULT_FONT_SIZE}px;
  text-decoration: underline;
  color: ${Color.GovernorsBay};
  cursor: pointer;
`;

export const Caption = styled(Text)`
  font-size: 13px;
  color: ${(props) => props.color || Color.SilverChalice};
`;
