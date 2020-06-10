import React, {useState} from "react";
import styled from "styled-components";

import {
    Caption,
    EditableText,
    Header,
    SpacedGroup,
} from "../../money-ui";
import {Color} from "../../styles";
import {formatAmount} from "../../lib/currency";

import BudgetItemRow from "./BudgetItemRow";
import InputRow from "./InputRow";

// TODO do better than stringified income/expense key

const BudgetCreator = (props) => {

        const [
                name,
                setName,
            ] = useState(props.name || "New Budget"),
            [
                incomes,
                setIncomes,
            ] = useState(props.incomes && props.incomes.sort(byDescendingAmount) || []),
            [
                expenses,
                setExpenses,
            ] = useState(props.expenses && props.expenses.sort(byDescendingAmount) || []),
            [
                incomeTotal,
                setIncomeTotal,
            ] = useState(getTotal(incomes)),
            [
                expenseTotal,
                setExpenseTotal,
            ] = useState(getTotal(expenses)),
            [
                budgetTotal,
                setBudgetTotal,
            ] = useState(incomeTotal - expenseTotal),

            handleNewIncome = (item) => {

                const newIncomes = [
                    ...incomes,
                    item,
                ].sort(byDescendingAmount);
                setIncomes(newIncomes);
                setIncomeTotal(getTotal(newIncomes));
                setBudgetTotal(getTotal(newIncomes) - expenseTotal);

            },

            handleNewExpense = (item) => {

                const newExpenses = [
                    ...expenses,
                    item,
                ].sort(byDescendingAmount);
                setExpenses(newExpenses);
                setExpenseTotal(getTotal(newExpenses));
                setBudgetTotal(incomeTotal - getTotal(newExpenses));

            },

            handleIncomeItemUpdate = (index) => (nameOrAmount) => (value) => {

                if (nameOrAmount === "name") {

                    incomes[index].name = value;

                }

                if (nameOrAmount === "amount") {

                    incomes[index].amount = value * 12;

                }
                setIncomes(incomes);
                setIncomeTotal(getTotal(incomes));
                setBudgetTotal(getTotal(incomes) - expenseTotal);

            },

            handleExpenseItemUpdate = (index) => (nameOrAmount) => (value) => {

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
                    onChange={setName}
                    typography="title"
                    value={name}
                />

                <SectionContainer>
                    <Header>
Income
                    </Header>
                    <RowsContainer centered={!incomes.length}>
                        {incomes.length
                            ? <>
                                {incomes.map((income, index) => <BudgetItemRow
                                    budgetItem={income}
                                    isOddNumberedRow={Boolean(index % 2)}
                                    key={JSON.stringify(income)}
                                    onUpdate={handleIncomeItemUpdate(index)}
                                />)}
                                <BudgetItemRow
                                    budgetItem={{"name": "Total Income",
                                        "amount": incomeTotal}}
                                    isOddNumberedRow={Boolean(incomes.length % 2)}
                                    isTotalRow
                                />
                            </>
                            : <Caption color={Color.ShipGrey}>
You haven&apos;t added any sources of income yet
                            </Caption>
                        }
                    </RowsContainer>
                    <InputRow onAdd={handleNewIncome} />
                </SectionContainer>

                <SectionContainer>
                    <Header>
Expenses
                    </Header>
                    <RowsContainer centered={!expenses.length}>
                        {expenses.length
                            ? <>
                                {expenses.map((expense, index) => <BudgetItemRow
                                    budgetItem={expense}
                                    isOddNumberedRow={Boolean(index % 2)}
                                    key={JSON.stringify(expense)}
                                    onUpdate={handleExpenseItemUpdate(index)}
                                />)}
                                <BudgetItemRow
                                    budgetItem={{"name": "Total Expenses",
                                        "amount": expenseTotal}}
                                    isOddNumberedRow={Boolean(expenses.length % 2)}
                                    isTotalRow
                                />
                            </>
                            : <Caption color={Color.ShipGrey}>
You haven&apos;t added any expenses yet
                            </Caption>
                        }
                    </RowsContainer>
                    <InputRow onAdd={handleNewExpense} />
                </SectionContainer>

                {budgetTotal ? <Header>
Total:
                    {formatAmount(budgetTotal / 12)}
                </Header> : null}
            </SpacedGroup>
        );

    },

    SectionContainer = styled.div`
  background-color: ${Color.TitanWhite};
  padding: 30px;
  border-radius: 5px;
`,

    RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.centered ? "center" : "flex-start"};
  align-items: center;
  background-color: ${Color.White};
  margin: 20px 0;
  border-radius: 5px;
  padding: 15px 10px;
`,

    getTotal = (list) => list.reduce(
        (sum, item) => sum + item.amount,
        0,
    ),

    byDescendingAmount = (budgetItem1, budgetItem2) => budgetItem2.amount - budgetItem1.amount;

export default BudgetCreator;
