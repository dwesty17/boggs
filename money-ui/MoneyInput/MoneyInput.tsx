import React, { useState } from "react";

import { TextInput } from "../TextInput";

const US_CURRENCY_EXPRESSION = /^\$?[0-9]*(\.[0-9]{0,2})?$/;

interface MoneyProps {
	onChange: (newValue: string) => void;
	placeholder?: string;
}

const MoneyInput: React.FC<MoneyProps> = (props) => {
    const [value, setValue] = useState("");

    const handleChange = (newValue: string) => {
        if (US_CURRENCY_EXPRESSION.test(newValue)) {
            setValue(newValue);
            props.onChange(newValue);
        }
    };

    return (
        <TextInput
            value={value}
            {...props}
            private={false}
            onChange={handleChange}
        />
    );
};

export default MoneyInput;
