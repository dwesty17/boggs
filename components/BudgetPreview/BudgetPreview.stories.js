import React from "react";

import BudgetPreview from "./BudgetPreview";

export default {
    title: "components/BudgetPreview",
};

export const Default = () => (
    <BudgetPreview
        budget={{
            name: "Real Fake Budget",
            incomes: [
                { name: "Paycheck #1", amount: 25000 },
                { name: "Paycheck #2", amount: 25000 },
            ],
            expenses: [
                { name: "Groceries", amount: 8000 },
                { name: "Rent", amount: 12000 },
                { name: "NYT Subscription", amount: 52 },
                { name: "Hulu Subscription", amount: 144 },
                { name: "Netflix Subscription", amount: 144 },
            ],
        }}
    />
);
