import React, { useState } from "react";

import {
    Button,
    DropdownMenu,
    Header,
    MoneyInput,
    SpacedGroup,
    TextInput,
    Title,
} from "../../money-ui";

const BudgetCreator = (props) => {
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [budget, setBudget] = useState(props.budget || { incomes: [], expenses: [] });

    const handleNewIncome = (item) => {
        budget.incomes.push(item);
        budget.incomes.sort(sortByAmount);
        setBudget(budget);
        setUnsavedChanges(true);
    };

    const handleNewExpense = (item) => {
        budget.expenses.push(item);
        budget.expenses.sort(sortByAmount);
        setBudget(budget);
        setUnsavedChanges(true);
    };

    return (
        <SpacedGroup>
            <Title>Budget: Default</Title>

            <Header>Incomes</Header>
            {budget.incomes.map((income, index) => (
                <BudgetItemRow key={index} budgetItem={income}/>
            ))}
            <InputRow onAdd={handleNewIncome}/>

            <Header>Expenses</Header>
            {budget.expenses.map((expense, index) => (
                <BudgetItemRow key={index} budgetItem={expense}/>
            ))}
            <InputRow onAdd={handleNewExpense}/>
        </SpacedGroup>
    );
};

const sortByAmount = (budgetItem1, budgetItem2) => {
    return budgetItem1.amount - budgetItem2.amount;
};

// TODO should I have a table component

// TODO move this into it's own file probably
const BudgetItemRow = ({ budgetItem }) => [
    <div key="name">{budgetItem.name}</div>,
    <div key="amount">{budgetItem.amount}</div>,
];

// TODO move this into it's own file probably
const InputRow = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [frequency, setFrequency] = useState("PER_MONTH");

    const handleAdd = () => {
        onAdd({ name, amount: getYearlyAmount(amount, frequency) });
        setName("");
        setAmount("");
        setFrequency("PER_MONTH");
    };

    return (
        <SpacedGroup direction="row">
            <TextInput
                value={name}
                placeholder="Name"
                width={125}
                onChange={setName}
            />

            <MoneyInput
                value={amount}
                placeholder="Amount"
                width={125}
                onChange={setAmount}
            />

            <DropdownMenu
                placeholder="Frequency"
                width={125}
                options={[
                    { value: "PER_DAY", name: "Per Day" },
                    { value: "PER_WEEK", name: "Per Week" },
                    { value: "PER_MONTH", name: "Per Month", selected: true },
                    { value: "PER_YEAR", name: "Per Year" },
                ]}
                onChange={setFrequency}
            />

            <Button primary={true} onClick={handleAdd}>Add</Button>
        </SpacedGroup>
    );
};

const getYearlyAmount = (amount, frequency) => {
    if (frequency === "PER_DAY") { return amount * 365; }
    if (frequency === "PER_WEEK") { return amount * 52; }
    if (frequency === "PER_MONTH") { return amount * 12; }
    if (frequency === "PER_YEAR") { return amount; }
    throw new Error(`Unknown budget item frequency ${JSON.stringify(frequency)}`);
};

export default BudgetCreator;
