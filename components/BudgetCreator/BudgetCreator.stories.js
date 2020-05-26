import React from "react";

import BudgetCreator from "./BudgetCreator";

export default {
    title: "components/BudgetCreator",
};

export const BlankBudget = () => <BudgetCreator/>;

export const ExampleBudget = () => (
    <BudgetCreator
        budget={{
            name: "2 Paycheck Months",
            incomes: [
                { name: "Paycheck #1", amount: 25000 },
                { name: "Paycheck #2", amount: 25000 },
            ],
            expenses: [
                { name: "Groceries", amount: 8000 },
                { name: "Rent", amount: 12000 },
                { name: "NYT Subscription", amount: 52 },
            ],
        }}
    />
);
