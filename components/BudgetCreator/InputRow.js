import React, {useRef, useState} from "react";

import {
    Button,
    DropdownMenu,
    MoneyInput,
    SpacedGroup,
    TextInput,
} from "../../money-ui";

const InputRow = ({onAdd}) => {

        const nameInput = useRef(null),

            [
                name,
                setName,
            ] = useState(""),
            [
                amount,
                setAmount,
            ] = useState(""),
            [
                frequency,
                setFrequency,
            ] = useState("PER_MONTH"),

            handleAdd = (event) => {

                event.preventDefault();
                if (name && amount && frequency) {

                    onAdd({name,
                        "amount": getYearlyAmount(
                            amount,
                            frequency,
                        )});
                    setName("");
                    setAmount("");
                    setFrequency("PER_MONTH");
                    nameInput.current.focus();

                }

            };

        return (
            <form onSubmit={handleAdd}>
                <SpacedGroup direction="row">
                    <TextInput
                        onChange={setName}
                        placeholder="Name"
                        ref={nameInput}
                        value={name}
                        width={125}
                    />

                    <MoneyInput
                        onChange={setAmount}
                        placeholder="Amount"
                        value={amount}
                        width={125}
                    />

                    <DropdownMenu
                        onChange={setFrequency}
                        options={[
                            {"value": "PER_DAY",
                                "name": "Per Day"},
                            {"value": "PER_WEEK",
                                "name": "Per Week"},
                            {"value": "PER_MONTH",
                                "name": "Per Month"},
                            {"value": "PER_YEAR",
                                "name": "Per Year"},
                        ]}
                        placeholder="Frequency"
                        value={frequency}
                        width={125}
                    />

                    <Button
                        disabled={!name || !amount}
                        onClick={handleAdd}
                        primary
                    >
                    Add
                    </Button>
                </SpacedGroup>
            </form>
        );

    },

    getYearlyAmount = (amountStr, frequency) => {

        const amount = parseFloat(amountStr.replace(
            /\$/,
            "",
        ));
        if (frequency === "PER_DAY") {

            return amount * 365;

        }
        if (frequency === "PER_WEEK") {

            return amount * 52;

        }
        if (frequency === "PER_MONTH") {

            return amount * 12;

        }
        if (frequency === "PER_YEAR") {

            return amount;

        }
        throw new Error(`Unknown budget item frequency ${JSON.stringify(frequency)}`);

    };

export default InputRow;
