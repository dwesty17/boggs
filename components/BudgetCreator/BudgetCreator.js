import React, { useState } from "react";
import styled from "styled-components";

import {
    Caption,
    Header,
    SpacedGroup,
    Title,
} from "../../money-ui";
import { Color } from "../../styles";

import BudgetItemRow from "./BudgetItemRow";
import InputRow from "./InputRow";

const BudgetCreator = (props) => {
    const [incomes, setIncomes] = useState((props.incomes && props.incomes.sort(byDescendingAmount)) || []);
    const [expenses, setExpenses] = useState((props.expenses && props.expenses.sort(byDescendingAmount)) || []);

    const incomeTotal = {
        name: "Total Income",
        amount: incomes.reduce((sum, income) => sum + income.amount, 0),
    };
    const expenseTotal = {
        name: "Total Expenses",
        amount: expenses.reduce((sum, expense) => sum + expense.amount, 0),
    };

    const budgetTotal = incomeTotal.amount - expenseTotal.amount;

    const handleNewIncome = (item) => {
        setIncomes([...incomes, item].sort(byDescendingAmount));
    };

    const handleNewExpense = (item) => {
        setExpenses([...expenses, item].sort(byDescendingAmount));
    };

    return (
        <SpacedGroup>
            <Title>New Budget</Title>

            <SectionContainer>
                <Header>Incomes</Header>
                <RowsContainer centered={!incomes.length}>
                    {incomes.length ? (
                        <>
                            {incomes.map((income, index) => (
                                <BudgetItemRow
                                    key={index}
                                    budgetItem={income}
                                    isOddNumberedRow={!!(index % 2)}
                                />
                            ))}
                            <BudgetItemRow
                                budgetItem={incomeTotal}
                                isTotalRow={true}
                                isOddNumberedRow={!!(incomes.length % 2)}
                            />
                        </>
                    ) : (
                        <Caption color={Color.ShipGrey}>You haven&apos;t added any sources of income yet</Caption>
                    )}
                </RowsContainer>
                <InputRow onAdd={handleNewIncome}/>
            </SectionContainer>

            <SectionContainer>
                <Header>Expenses</Header>
                <RowsContainer centered={!expenses.length}>
                    {expenses.length ? (
                        <>
                            {expenses.map((expense, index) => (
                                <BudgetItemRow
                                    key={index}
                                    budgetItem={expense}
                                    isOddNumberedRow={!!(index % 2)}
                                />
                            ))}
                            <BudgetItemRow
                                budgetItem={expenseTotal}
                                isTotalRow={true}
                                isOddNumberedRow={!!(expenses.length % 2)}
                            />
                        </>
                    ) : (
                        <Caption color={Color.ShipGrey}>You haven&apos;t added any expenses yet</Caption>
                    )}
                </RowsContainer>
                <InputRow onAdd={handleNewExpense}/>
            </SectionContainer>

            {budgetTotal ? <Header>Total: {formatAmount(budgetTotal)}</Header> : null}
        </SpacedGroup>
    );
};

const SectionContainer = styled.div`
  background-color: ${Color.TitanWhite};
  padding: 30px;
  border-radius: 5px;
`;

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.centered ? "center" : "flex-start"};
  align-items: center;
  background-color: ${Color.White};
  margin: 20px 0;
  border-radius: 5px;
  padding: 15px 10px;
`;

const byDescendingAmount = (budgetItem1, budgetItem2) => {
    return budgetItem2.amount - budgetItem1.amount;
};

const formatAmount = (amount) => {
    const currencyParts = (amount / 12).toFixed(2).toString().split(".");
    currencyParts[0] = currencyParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${currencyParts.join(".")}`;
};

export default BudgetCreator;
