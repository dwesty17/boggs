import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";
import { VictoryChart, VictoryBar } from "victory";

import "./styles.scss";
import LoadingSpinner from "../LoadingSpinner";

const SPENDING_PER_DAY_QUERY = gql`
    query GetAmountsSpent($from: String!, $to: String!) {
        getAmountSpentPerDay(from: $from, to: $to)
    }
`;

const PaymentChart = () => {
    const from = moment().subtract(5, "days").startOf("day").valueOf().toString();
    const to = moment().startOf("day").valueOf().toString();

    const { loading, error, data } = useQuery(SPENDING_PER_DAY_QUERY, {
        variables: { from, to },
    });

    if (error) {
        alert("We are experiencing a problem");
        return;
    }

    if (loading) {
        return <LoadingSpinner/>;
    }

    const { getAmountSpentPerDay } = data;

    return (
        <div className="container">
            <VictoryChart>
                <VictoryBar
                    data={getAmountSpentPerDay.map((amount, index) => ({
                        x: index,
                        y0: 0,
                        y: amount,
                        label: `$${amount.toFixed(0)}`,
                    }))}
                />
            </VictoryChart>
        </div>
    )
};

export default PaymentChart;
