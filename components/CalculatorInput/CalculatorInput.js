import React, {useState} from "react";

import Input from "../Input";

const CalculatorInput = (props) => {

    const [
            previousValue,
            setPreviousValue,
        ] = useState(""),
        [
            value,
            setValue,
        ] = useState(""),

        onChange = ({target}) => {

            const operation = buildOperation(target.value);
            if (isOperationValid(operation)) {

                setValue(previousValue);

            } else {

                const reducedOperation = reduceOperation(operation),

                    newInputValue = constructNewInputValue(reducedOperation);
                setValue(newInputValue);
                setPreviousValue(newInputValue);

                const result = calculateResult(operation);
                props.onChange(result);

            }

        },

        onBlur = () => {};

    return (
        <Input
            {...props}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
        />
    );

};

export const buildOperation = (inputString) => {

    const operands = getRawOperands(inputString),
        operators = getOperators(inputString);
    return areOperandsValid(operands) && {
        "operands": operands.filter((operand) => Boolean(operand)).map((operand) => parseFloat(operand)),
        operators,
    };

};

const operatorRegEx = /[+\-*\/]/gm;

export const getRawOperands = (inputString) => inputString.trim().split(operatorRegEx).
    map((operator) => operator[0] === "$" ? operator.slice(1) : operator);

export const getOperators = (inputString) => [...inputString.matchAll(operatorRegEx)].map((match) => match[0]);

export const areOperandsValid = (operands) => {

    for (const operand of operands) {

        if (isNaN(operand)) {

            return false;

        }

    }
    return true;

};

export const isOperationValid = (operation) => operation &&
      operation.operands.length === operation.operators.length &&
      operation.operands.length - 1 === operation.operators.length;

export const reduceOperation = (operation) => {

    if (operation.operands.length < 2) {

        return operation;

    } else if (operation.operands.length === operation.operators.length) {

        const newFirstOperand = calculateResult(
            operation,
            0,
        );
        return {
            "operands": [newFirstOperand],
            "operators": [...operation.operators.slice(-1)],
        };

    }
    const newFirstOperand = calculateResult(
        operation,
        1,
    );
    return {
        "operands": [
            newFirstOperand,
            ...operation.operands.slice(-1),
        ],
        "operators": [...operation.operators.slice(-1)],
    };

};

export const calculateResult = (operation, leaveNumOperands = 0) => {

    let result = operation.operands[0];
    for (let i = 1; i < operation.operands.length - leaveNumOperands; i++) {

        if (operation.operands[i - 1] === "+") {

            result += operation.operands[i];

        }
        if (operation.operands[i - 1] === "-") {

            result -= operation.operands[i];

        }
        if (operation.operands[i - 1] === "*") {

            result *= operation.operands[i];

        }
        if (operation.operands[i - 1] === "/") {

            result /= operation.operands[i];

        }

    }
    return result;

};

export const constructNewInputValue = (operation) => {

    let inputString = "";
    for (let i = 0; i < operation.operands.length; i++) {

        inputString = `${inputString}${operation.operands[i]}`;
        if (operation.operators[i]) {

            inputString = `${inputString}${operation.operators[i]}`;

        }

    }
    return inputString ? `$${inputString}` : "";

};

export default CalculatorInput;
