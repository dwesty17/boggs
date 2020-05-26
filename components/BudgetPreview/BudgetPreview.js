import React from "react";
import styled from "styled-components";

import { Card } from "../../money-ui/Card";
import { Header, Title } from "../../money-ui/typography";
import { SpacedGroup } from "../../money-ui/SpacedGroup";
import { formatAmount } from "../../lib/currency";

const BudgetPreview = ({ budget, onClick }) => {
    const incomes = budget.incomes.sort(byDescendingAmount);
    const expenses = budget.expenses.sort(byDescendingAmount);

    const incomeTotal = incomes.reduce((total, income) => {
        return total + income.amount;
    }, 0);
    const expenseTotal = expenses.reduce((total, expense) => {
        return total + expense.amount;
    }, 0);

    return (
        <Container onClick={onClick}>
            <SpacedGroup direction="column">
                <Title>{budget.name}</Title>

                <Header>Income - {formatAmount(incomeTotal/12)}</Header>

                {incomes[0] && (
                    <div>
                        {incomes[0].name} {incomes[0].amount}
                    </div>
                )}

                {incomes[1] && (
                    <div>
                        {incomes[1].name} {incomes[1].amount}
                    </div>
                )}

                {incomes.length > 2 && (
                    <div>More items...</div>
                )}

                <Header>Expenses - {formatAmount(expenseTotal/12)}</Header>

                {expenses[0] && (
                    <div>
                        {expenses[0].name} {expenses[0].amount}
                    </div>
                )}

                {expenses[1] && (
                    <div>
                        {expenses[1].name} {expenses[1].amount}
                    </div>
                )}

                {expenses.length > 2 && (
                    <div>{expenses.length - 2} more items...</div>
                )}
            </SpacedGroup>
        </Container>
    );
};

const Container = styled(Card)`
  cursor: pointer;
`;

// TODO this should go into a shared utils file
const byDescendingAmount = (budgetItem1, budgetItem2) => {
    return budgetItem2.amount - budgetItem1.amount;
};

export default BudgetPreview;
