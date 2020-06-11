import React from "react";
import {MdAdd} from "react-icons/md";

const AddTransactionButton = ({size, handleAddTransactionClick}) => (
    <button
        className="icon-button"
        onClick={handleAddTransactionClick}
    >
        <MdAdd size={size}/>
    </button>
);

export default AddTransactionButton;
