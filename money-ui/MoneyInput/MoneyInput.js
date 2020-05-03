import React, { useState } from "react";

import { TextInput } from "../TextInput";

const US_CURRENCY_EXPRESSION = /^\$?[0-9]*(\.[0-9]{0,2})?$/;

const MoneyInput = (props) => {
    const [value, setValue] = useState("");

    const handleChange = (newValue) => {
        if (US_CURRENCY_EXPRESSION.test(newValue)) {
            setValue(newValue);
            props.onChange && props.onChange(newValue);
        }
    };

    return (
        <TextInput
            {...props}
            private={false}
            value={value}
            onChange={handleChange}
        />
    );
};

export default MoneyInput;
