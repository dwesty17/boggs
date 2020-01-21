import React, {useState} from "react";

import Input from "./Input";

const CalculatorInput = (props) => {
    const [leftOperand, setLeftOperand] = useState("");
    const [operator, setOperator] = useState("");
    const [rightOperand, setRightOperand] = useState("");

    const onChange = ({ target }) => {
        // if (["+", "-", "*", "/"].includes(target.value))
        setLeftOperand(target.value);
    };

    const onBlur = () => {
        if (leftOperand && rightOperand) {
            setLeftOperand(calculateResult(operator, leftOperand, rightOperand));
            setOperator("");
            setRightOperand("");
        }
    };

    return (
        <Input
            {...props}
            onChange={onChange}
            onBlur={onBlur}
            value={`${leftOperand}${operator}${rightOperand}`}
        />
    );
};

const calculateResult = (operator, leftOperand, rightOperand) => {
    if (operator === "+") {
        return leftOperand + rightOperand;
    } else if (operator === "-") {
        return leftOperand - rightOperand;
    } else if (operator === "*") {
        return leftOperand * rightOperand;
    } else if (operator === "/") {
        return leftOperand / rightOperand;
    } else {
        return leftOperand;
    }
};

export default CalculatorInput;
