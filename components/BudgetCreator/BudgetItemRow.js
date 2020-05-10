import React from "react";
import styled from "styled-components";

import { Color } from "../../styles";

const BudgetItemRow = ({ budgetItem, isTotalRow, isOddNumberedRow }) => (
    <Container isOddNumberedRow={isOddNumberedRow}>
        <NameColumn isTotalRow={isTotalRow}>
            {budgetItem.name}
        </NameColumn>

        <AmountColumn isTotalRow={isTotalRow}>
            {formatAmount(budgetItem.amount)}
        </AmountColumn>
    </Container>
);

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.isOddNumberedRow ? Color.TitanWhite : Color.White};
  padding: 5px 10px;
`;

const NameColumn = styled.div`
  width: 45%;
  font-weight: ${(props) => props.isTotalRow ? 600 : 400};
`;

const AmountColumn = styled.div`
  font-weight: ${(props) => props.isTotalRow ? 600 : 400};
`;

const formatAmount = (amount) => {
    const currencyParts = (amount / 12).toFixed(2).toString().split(".");
    currencyParts[0] = currencyParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${currencyParts.join(".")}`;
};

export default BudgetItemRow;
