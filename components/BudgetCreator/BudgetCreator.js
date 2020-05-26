import React, { useState } from "react";
import styled from "styled-components";

import {
    Caption,
    EditableText,
    Header,
    SpacedGroup,
} from "../../money-ui";
import { Color } from "../../styles";
import { formatAmount } from "../../lib/currency";

import BudgetItemRow from "./BudgetItemRow";
import InputRow from "./InputRow";

// TODO do better than stringified income/expense key

const BudgetCreator = (props) => {
    const [name, setName] = useState((props.budget && props.budget.name) || "New Budget");
    const [incomes, setIncomes] = useState(((props.budget && props.budget.incomes) && props.budget.incomes.sort(byDescendingAmount)) || []);
    const [expenses, setExpenses] = useState(((props.budget && props.budget.expenses) && props.budget.expenses.sort(byDescendingAmount)) || []);
    const [incomeTotal, setIncomeTotal] = useState(getTotal(incomes));
    const [expenseTotal, setExpenseTotal] = useState(getTotal(expenses));
    const [budgetTotal, setBudgetTotal] = useState(incomeTotal - expenseTotal);

    const handleNewIncome = (item) => {
        const newIncomes = [...incomes, item].sort(byDescendingAmount);
        setIncomes(newIncomes);
        setIncomeTotal(getTotal(newIncomes));
        setBudgetTotal(getTotal(newIncomes) - expenseTotal);
    };

    const handleNewExpense = (item) => {
        const newExpenses = [...expenses, item].sort(byDescendingAmount);
        setExpenses(newExpenses);
        setExpenseTotal(getTotal(newExpenses));
        setBudgetTotal(incomeTotal - getTotal(newExpenses));
    };

    const handleIncomeItemUpdate = (index) => (nameOrAmount) => (value) => {
        if (nameOrAmount === "name") {
            incomes[index].name = value;
        }

        if (nameOrAmount === "amount") {
            incomes[index].amount = value * 12;
        }
        setIncomes(incomes);
        setIncomeTotal(getTotal(incomes));
        setBudgetTotal(getTotal(incomes) - expenseTotal);
    };

    const handleExpenseItemUpdate = (index) => (nameOrAmount) => (value) => {
        if (nameOrAmount === "name") {
            expenses[index].name = value;
        }

        if (nameOrAmount === "amount") {
            expenses[index].amount = value * 12;
        }
        setExpenses(expenses);
        setExpenseTotal(getTotal(expenses));
        setBudgetTotal(incomeTotal - getTotal(expenses));
    };

    return (
        <SpacedGroup>
            <EditableText
                value={name}
                typography="title"
                onChange={setName}
            />

            <SectionContainer>
                <Header>Income</Header>
                <RowsContainer centered={!incomes.length}>
                    {incomes.length ? (
                        <>
                            {incomes.map((income, index) => (
                                <BudgetItemRow
                                    key={JSON.stringify(income)}
                                    budgetItem={income}
                                    isOddNumberedRow={!!(index % 2)}
                                    onUpdate={handleIncomeItemUpdate(index)}
                                />
                            ))}
                            <BudgetItemRow
                                budgetItem={{ name: "Total Income", amount: incomeTotal }}
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
                                    key={JSON.stringify(expense)}
                                    budgetItem={expense}
                                    isOddNumberedRow={!!(index % 2)}
                                    onUpdate={handleExpenseItemUpdate(index)}
                                />
                            ))}
                            <BudgetItemRow
                                budgetItem={{ name: "Total Expenses", amount: expenseTotal }}
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

            {budgetTotal ? <Header>Total: {formatAmount(budgetTotal / 12)}</Header> : null}
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

const getTotal = (list) => {
    return list.reduce((sum, item) => sum + item.amount, 0);
};

// TODO this should go into a shared utils file
const byDescendingAmount = (budgetItem1, budgetItem2) => {
    return budgetItem2.amount - budgetItem1.amount;
};

export default BudgetCreator;
