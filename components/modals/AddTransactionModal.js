import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

import "../../styles.scss";
import redirect from "../../lib/redirect";

const ADD_TRANSACTION_MUTATION = gql`
    mutation CreateTransaction($transaction: TransactionInput!) {
        createTransaction(transaction: $transaction) {
            id
        }
    }
`;

const AddTransactionModal = ({ visible, onClose }) => {
    if (!visible) { return null; }

    // "1970-03-01T00:10"
    const [transactionTime, setTransactionTime] = useState(moment().format("YYYY-MM-DDTHH:mm"));
    const [amount, setAmount] = useState("");
    const [transactee, setTransactee] = useState("");
    const [description, setDescription] = useState("");

    const [updateUser] = useMutation(ADD_TRANSACTION_MUTATION, {
        onCompleted({}) {
            setTransactionTime(moment().format("YYYY-MM-DDTHH:mm"));
            setAmount("");
            setTransactee("");
            setDescription("");
            redirect({}, "/");
        },
        onError(error) {
            if (error) {
                console.error(error);
            }
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateUser({
            variables: {
                transaction: {
                    transactionTime,
                    amount: parseFloat(amount),
                    transactee,
                    description,
                },
            }
        });
    };

    return (
        <div className="modal-background">
            <section className="modal-main">
                <h2>New transaction</h2>
                <form>
                    <input
                        placeholder="Time"
                        type="datetime-local"
                        value={transactionTime}
                        onChange={(event) => { setTransactionTime(event.target.value); }}
                    />

                    <input
                        placeholder="Amount"
                        type="number"
                        value={amount}
                        onChange={(event) => { setAmount(event.target.value); }}
                    />

                    <input
                        placeholder="Transactee"
                        type="text"
                        value={transactee}
                        onChange={(event) => { setTransactee(event.target.value); }}
                    />

                    <input
                        placeholder="Description"
                        type="text"
                        value={description}
                        onChange={(event) => { setDescription(event.target.value); }}
                    />

                    <button
                        disabled={false}
                        onClick={handleSubmit}
                    >
                        Add transaction
                    </button>

                    <button
                        disabled={false}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </form>
            </section>
        </div>
    );
};

export default AddTransactionModal;
