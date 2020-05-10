import styled from "styled-components";

import { Color, Font } from "../../styles";

export const Title = styled.p`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 30}px;
  font-weight: 600;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const Header = styled.p`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 24}px;
  font-weight: 600;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const Text = styled.p`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 16}px;
  font-weight: 400;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const LinkText = styled.a`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 16}px;
  text-decoration: underline;
  color: ${Color.GovernorsBay};
  cursor: pointer;
`;

export const Caption = styled(Text)`
  font-size: 12px;
  color: ${(props) => props.color || Color.SilverChalice};
`;
