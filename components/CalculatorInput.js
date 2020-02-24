import React, {useState} from "react";

import Input from "./Input";

const CalculatorInput = (props) => {
    const [previousValue, setPreviousValue] = useState("");
    const [value, setValue] = useState("");

    // TODO call onChange prop with value
    // TODO do math if another operand is entered after right operator
    // TODO switch operands if a second is typed in after the first
    const onChange = ({ target }) => {
        // const nextInputValue = validateInput(target.value);
        // setValue(nextInputValue);

        const operationArray = getOperationAsArray(target.value);
        setValue(target.value);
        props.onChange(operationArray[0], operationArray[1]);
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
                return previousValue;
            }
        }

        if (value) {
            value = `$${value}`;
        }

        setPreviousValue(value);
        return value;
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

const getOperationAsArray = (inputString) => {
    const operatorRegExp = /[*\/+\-]/gm;
    const operators = inputString.match(operatorRegExp) || [];
    const operands = inputString.split(operatorRegExp);
    return operands.reduce((result, operand, index) => result.push(operand, operators[index]), []);
};

const calculateDollarAmount = (inputString) => {
    ["+", "-", "*", "/"].forEach((operator) => {
        const operands = inputString.replace("$", "").split(operator).map(operand => parseFloat(operand));

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

const validOperands = (operands) => {
    return !isNaN(parseFloat(operands[0])) && !isNaN(parseFloat(operands[1]));
};

const operatorRegEx = /[+\-*\/]/gm;

export const getRawOperands = (inputString) => {
    return inputString.split(operatorRegEx).map((operator) => {
        return operator[0] === "$" ? operator.slice(1) : operator;
    });
};

export const getOperators = (inputString) => {
    return [...inputString.matchAll(operatorRegEx)].map((match) => match[0])
};

export const buildOperation = (operands, operators) => {
    return areOperandsValid(operands) ? {
        operands: operands.map((operand) => parseFloat(operand)),
        operators
    } : { operands: [], operators: [] };
};

export const areOperandsValid = (operands) => {
    for (const operand of operands) {
        if (isNaN(operand)) { return false; }
    }
    return true;
};

export const calculateResult = (operation) => {
    let result = operation.operands[0];
    for (let i = 1; i < operation.operands.length; i++) {
        if (operation.operands[i-1] === "+") { result += operation.operands[i] }
        if (operation.operands[i-1] === "-") { result -= operation.operands[i] }
        if (operation.operands[i-1] === "*") { result *= operation.operands[i] }
        if (operation.operands[i-1] === "/") { result /= operation.operands[i] }
    }
    return result;
};

export const constructNewInputValue = () => {

};

export const reduceOperation = () => {

};


export default CalculatorInput;
