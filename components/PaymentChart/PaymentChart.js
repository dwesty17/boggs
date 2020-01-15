import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";
import {
    FlexibleXYPlot,
    XAxis,
    YAxis,
    LabelSeries,
    VerticalBarSeries,
} from 'react-vis';

import "./styles.scss";
import LoadingSpinner from "../LoadingSpinner";

const SPENDING_PER_DAY_QUERY = gql`
    query GetAmountsSpent($from: String!, $to: String!) {
        getAmountSpentPerDay(from: $from, to: $to)
    }
`;

const PaymentChart = () => {
    const from = moment().subtract(20, "days").startOf("day").valueOf().toString();
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

    const chartData = getAmountSpentPerDay.map((amount, index) => ({
        x: moment().subtract(20 - index, "days").valueOf(),
        y: amount,
        label: `$${amount.toFixed(0)}`,
    }));

    return (
        <div className="container">
            <FlexibleXYPlot margin={{ top: 50, left: 50 }}>
                <YAxis
                    tickFormat={(y) => `$${y}`}
                    style={{ text: { fontSize: 12 } }}
                />
                <XAxis
                    tickFormat={(x) => moment(x).format("M/D")}
                    style={{ text: { fontSize: 12 } }}
                />
                <VerticalBarSeries
                    color="#7fdbff"
                    data={chartData}
                />
                <LabelSeries
                    data={chartData}
                    rotation={-90}
                />
            </FlexibleXYPlot>
        </div>
    )
};

export default PaymentChart;
