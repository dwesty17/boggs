import React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
    const { loading, error, data } = useQuery(GET_TRANSACTIONS_QUERY);

    if (error) {
        alert("We are experiencing a problem");
        return;
    }

    if (loading) {
        return <LoadingSpinner/>;
    }

    return <></>;
};

export default TransactionsTable;
