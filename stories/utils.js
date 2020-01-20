import styled from "styled-components";

import { SILVER } from "../styles/colors";

export const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${SILVER};
  padding: 20px;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 15px;
`;
