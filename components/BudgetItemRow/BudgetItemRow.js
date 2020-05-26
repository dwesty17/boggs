import React from "react";
import styled from "styled-components";

import { Color } from "../../styles";
import { EditableText } from "../../money-ui";
import { formatAmount } from "../../lib/currency";

const BudgetItemRow = ({
   budgetItem,
   isEditable,
   hasColoredBackground,
   onUpdate,
}) => (
    <Container hasColoredBackground={hasColoredBackground}>
        <NameColumn isEditable={isEditable}>
            {isEditable ? (
                <EditableText
                    value={budgetItem.name}
                    compact={true}
                    onChange={onUpdate("name")}
                />
            ) : (
                budgetItem.name
            )}
        </NameColumn>

        <AmountColumn isEditable={isEditable}>
            {isEditable ? (
                <EditableText
                    type="money"
                    value={formatAmount(budgetItem.amount / 12)}
                    compact={true}
                    onChange={onUpdate("amount")}
                />
            ) : (
                formatAmount(budgetItem.amount / 12)
            )}
        </AmountColumn>
    </Container>
);

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.hasColoredBackground ? Color.TitanWhite : Color.White};
  padding: 5px 10px;
`;

const NameColumn = styled.div`
  width: 45%;
  font-weight: ${(props) => props.isEditable ? 600 : 400};
  padding: ${(props) => props.isEditable && "2px 0 0 5px"}
`;

const AmountColumn = styled.div`
  font-weight: ${(props) => props.isEditable ? 600 : 400};
  padding: ${(props) => props.isEditable && "2px 0"}
`;

export default BudgetItemRow;
