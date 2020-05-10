import React, { useState } from "react";

import {
    Button,
    DropdownMenu,
    MoneyInput,
    SpacedGroup,
    TextInput,
} from "../../money-ui";

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
                value={frequency}
                placeholder="Frequency"
                options={[
                    { value: "PER_DAY", name: "Per Day" },
                    { value: "PER_WEEK", name: "Per Week" },
                    { value: "PER_MONTH", name: "Per Month" },
                    { value: "PER_YEAR", name: "Per Year" },
                ]}
                width={125}
                onChange={setFrequency}
            />

            <Button
                primary={true}
                disabled={!name || !amount}
                onClick={handleAdd}
            >
                Add
            </Button>
        </SpacedGroup>
    );
};

const getYearlyAmount = (amountStr, frequency) => {
    const amount = parseFloat(amountStr.replace(/\$/, ""));
    if (frequency === "PER_DAY") { return amount * 365; }
    if (frequency === "PER_WEEK") { return amount * 52; }
    if (frequency === "PER_MONTH") { return amount * 12; }
    if (frequency === "PER_YEAR") { return amount; }
    throw new Error(`Unknown budget item frequency ${JSON.stringify(frequency)}`);
};

export default InputRow;
