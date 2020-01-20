import styled from "styled-components";

import { GRAY } from "../styles/colors";

const Button = styled.button`
    height: 40px;
    width: ${({width}) => width || "200px"};
    margin-bottom: 10px;
    background-color: transparent;
    font-size: 16px;
    border: 1px solid ${GRAY};
    cursor: pointer;
`;

export default Button;
