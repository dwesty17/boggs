import React, { useState } from "react";

import { TextInput, TextInputProps } from "../TextInput";

const US_CURRENCY_EXPRESSION = /^\$?[0-9]*(\.[0-9]{0,2})?$/;

const MoneyInput: React.FC<TextInputProps> = (props) => {
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
