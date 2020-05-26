import React from "react";
import { action } from "@storybook/addon-actions";

import { Card, SpacedGroup } from "../../money-ui";

import BudgetItemRow from "./BudgetItemRow";

export default {
    title: "components/BudgetItemRow",
};

export const WithEditableRows = () => (
    <SpacedGroup direction="column">
        <BudgetItemRow
            budgetItem={{ name: "Real Fake Income #1", amount: 1000000 }}
            isEditable={true}
            hasColoredBackground={false}
            onUpdate={action("Updated Real Fake Income #1")}
        />

        <BudgetItemRow
            budgetItem={{ name: "Real Fake Income #2", amount: 10000 }}
            isEditable={true}
            hasColoredBackground={true}
            onUpdate={action("Updated Real Fake Income #2")}
        />
    </SpacedGroup>
);

export const WithNonEditableRows = () => (
    <SpacedGroup direction="column">
        <BudgetItemRow
            budgetItem={{ name: "Real Fake Concerts", amount: 10000 }}
            isEditable={false}
            hasColoredBackground={true}
            onUpdate={action("Real Fake Concerts")}
        />

        <BudgetItemRow
            budgetItem={{ name: "Real Fake Doors", amount: 10000 }}
            isEditable={false}
            hasColoredBackground={false}
            onUpdate={action("Real Fake Doors")}
        />

        <BudgetItemRow
            budgetItem={{ name: "Real Fake Beers", amount: 10000 }}
            isEditable={false}
            hasColoredBackground={true}
            onUpdate={action("Real Fake Beers")}
        />
    </SpacedGroup>
);
