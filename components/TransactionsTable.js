import React from "react";
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { MdAdd } from "react-icons/md";

import "../styles.scss";
import LoadingSpinner from "./LoadingSpinner";

const GET_TRANSACTIONS_QUERY = gql`
    query {
        getTransactions {
            id
            transactionTime
            amount
            transactee
            description
        }
    }
`;

const TransactionsTable = () => {
    const {loading, error, data} = useQuery(GET_TRANSACTIONS_QUERY);

    if (error) {
        alert("We are experiencing a problem");
        return;
    }

    if (loading) {
        return <LoadingSpinner/>;
    }

    const transactions = data.getTransactions;

    if (transactions.length === 0) {
        return (
            <div className="transactions-table">
                <TransactionsTableHeader/>
                <p>You haven't recorded any transactions yet.</p>
            </div>
        )
    }

    return (
        <div className="transactions-table">
            <TransactionsTableHeader/>
        </div>
    );
};

const TransactionsTableHeader = () => (
    <div className="transactions-table-header">
        <h2>Transactions</h2>
        <button className="icon-button">
            <MdAdd/>
        </button>
    </div>
);

export default TransactionsTable;
