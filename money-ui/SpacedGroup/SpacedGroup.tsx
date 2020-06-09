import React from "react";
import styled from "styled-components";

interface Props {
	alignment: string;
	direction: "column" | "row";
	space: number;
}

const SpacedGroup: React.FC<Props> = ({ children, ...props }) => {
    return (
        <Container {...props}>
            {React.Children.map(children, (child) => (
                child && (
                    <ElementContainer {...props}>
                        {child}
                    </ElementContainer>
                )
            ))}
        </Container>
    );
};

const Container = styled.div<Props>`
  width: fit-content;
  display: flex;
  align-items: ${(props) => props.alignment || "flex-start"};
  flex-direction: ${(props) => props.direction || "column"};
  margin-bottom: ${(props) => (props.direction !== "row")  && -(props.space || 15)}px;
  margin-right: ${(props) => (props.direction === "row")  && -(props.space || 15)}px;
`;

const ElementContainer = styled.div<Props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignment || "flex-start"};
  margin-bottom: ${(props) => (props.direction !== "row")  && (props.space || 15)}px;
  margin-right: ${(props) => (props.direction === "row")  && (props.space || 15)}px;
`;

export default SpacedGroup;
