import React, {useState} from "react";

import Input from "./Input";

const CalculatorInput = (props) => {
    const [value, setValue] = useState("");

    // TODO call onChange prop with value
    // TODO do math if another operand is entered after right operator
    // TODO switch operands if a second is typed in after the first
    // TODO validate value on every change cycle
    const onChange = ({ target }) => {
        setValue(validateInput(target.value));
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

const validateInput = (value) => {
    value = value.trim().replace("$", "");

    let operands = [value];

    if (value.split("+").length > 1) {
        operands = value.split("+");
    } else if (value.split("-").length > 1) {
        operands = value.split("-");
    } else if (value.split("*").length > 1) {
        operands = value.split("*");
    } else if (value.split("/").length > 1) {
        operands = value.split("/");
    }

    for (let i = 0; i < operands.length; i++) {
        if (isNaN(operands[i])) {
            // TODO it would be better to return the previous value which was valid, but how do we get it?
            return "";
        }
    }

    if (value) {
        value = `$${value}`;
    }
    return value;
};

const validOperands = (operands) => {
    return !isNaN(parseFloat(operands[0])) && !isNaN(parseFloat(operands[1]));
};

export default CalculatorInput;
