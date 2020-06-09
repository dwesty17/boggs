import styled, { css } from "styled-components";

import { Color, Font } from "../../styles";

interface Props {
	size?: number;
	color?: string;
}

export const TitleStyles = css<Props>`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 30}px;
  font-weight: 600;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const Title = styled.p<Props>`
  ${TitleStyles};
`;

export const HeaderStyles = css<Props>`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 24}px;
  font-weight: 600;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const Header = styled.p<Props>`
  ${HeaderStyles};
`;

export const TextStyles = css<Props>`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 16}px;
  font-weight: 400;
  color: ${(props) => props.color || Color.ShipGrey};
  margin: 0;
`;

export const Text = styled.p<Props>`
  ${TextStyles};
`;

export const LinkText = styled.a<Props>`
  font-family: ${Font.OpenSans};
  font-size: ${(props) => props.size || 16}px;
  text-decoration: underline;
  color: ${Color.GovernorsBay};
  cursor: pointer;
`;

export const CaptionStyles = css<Props>`
  font-size: 12px;
  color: ${(props) => props.color || Color.SilverChalice};
`;

export const Caption = styled(Text)`
  ${CaptionStyles};
`;
