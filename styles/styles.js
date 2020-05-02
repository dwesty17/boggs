import styled, { createGlobalStyle } from "styled-components";

import { Color } from "./colors";
import { Font } from "./fonts";

export const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Lobster&family=Roboto&display=swap");

  body {
    width: 100vw;
    height: 100vh;
    font-family: ${Font.Lobster};
    background: ${Color.White};
  }
  
  input {
    font-family: ${Font.OpenSans};
  }
`;

export const StylesContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Lobster&family=Roboto&display=swap");

  body {
    width: 100vw;
    height: 100vh;
    font-family: ${Font.Lobster};
    background: ${Color.White};
  }
  
  input {
    font-family: ${Font.OpenSans};
  }
`;
