import React from "react";
import styled from "styled-components";

const SpacedGroup = ({ children, ...props }) => {
    return (
        <Container {...props}>
            {React.Children.map(children, (child) => (
                <ElementContainer {...props}>
                    {child}
                </ElementContainer>
            ))}
        </Container>
    );
};

const Container = styled.div`
  width: fit-content;
  display: flex;
  align-items: ${(props) => props.alignment || "flex-start"};
  flex-direction: ${(props) => props.direction || "column"};
`;

const ElementContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignment || "flex-start"};
  margin-bottom: ${(props) => (props.direction !== "row")  && (props.space || 15)}px;
  margin-right: ${(props) => (props.direction === "row")  && (props.space || 15)}px;
`;

export default SpacedGroup;