import styled from "styled-components";

import { Color } from "../../styles";

const Card = styled.div`
    width: ${(props) => props.width ? `${props.width}px` : "fit-content"};
    height: ${(props) => props.height ? `${props.height}px` : "fit-content"};
    display: flex;
    background-color: ${(props) => props.color || Color.White};
    box-shadow: 5px 5px 15px ${Color.Alto};
    padding: 25px 15px;
    border-radius: 10px;
`;

export { Card };
