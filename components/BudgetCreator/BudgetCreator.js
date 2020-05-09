import React from "react";

import {
    Button,
    DropdownMenu,
    Header,
    MoneyInput,
    SpacedGroup,
    TextInput,
    Title,
} from "../../money-ui";

const BudgetCreator = () => (
    <SpacedGroup>
        <Title>Budget: Default</Title>

        <Header>Income</Header>
        <InputRow/>

        <Header>Expenses</Header>
        <InputRow/>
    </SpacedGroup>
);

const InputRow = () => (
    <SpacedGroup direction="row">
        <TextInput placeholder="Name" width={125}/>

        <MoneyInput placeholder="Amount" width={125}/>

        <DropdownMenu
            placeholder="Frequency"
            width={125}
            options={[
                { value: "PER_DAY", name: "Per Day" },
                { value: "PER_WEEK", name: "Per Week" },
                { value: "PER_MONTH", name: "Per Month" },
                { value: "PER_YEAR", name: "Per Year" },
            ]}
        />

        <Button primary={true}>Add</Button>
    </SpacedGroup>
);

export default BudgetCreator;
