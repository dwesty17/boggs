import React, {useState} from "react";

import Input from "./Input";

const CalculatorInput = (props) => {
    const [value, setValue] = useState("");

    const onChange = ({ target }) => {
        setValue(calculateNewValue(target.value));
    };

    const onBlur = () => {
        ["+", "-", "*", "/"].forEach((operator) => {
            const operands = value.replace("$", "").split(operator);

            if (!operands[1]) { return; }
            if (!validOperands(operands)) {
                setValue("");
            }

            const leftOperand = parseFloat(operands[0]);
            const rightOperand = parseFloat(operands[1]);

            switch (operator) {
                case "+":
                    setValue(`$${(leftOperand + rightOperand).toFixed(2)}`);
                    return;
                case "-":
                    setValue(`$${(leftOperand - rightOperand).toFixed(2)}`);
                    return;
                case "*":
                    setValue(`$${(leftOperand * rightOperand).toFixed(2)}`);
                    return;
                case "/":
                    setValue(`$${(leftOperand / rightOperand).toFixed(2)}`);
                    return;
            }
        });
    };

    return (
        <Input
            {...props}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
        />
    );
};

const calculateNewValue = (value) => {
    value = value.trim();
    if (value && value[0] !== "$") {
        value = `$${value}`;
    }
    return value;
};

const validOperands = (operands) => {
    return !isNaN(parseFloat(operands[0])) && !isNaN(parseFloat(operands[1]));
};

export default CalculatorInput;
