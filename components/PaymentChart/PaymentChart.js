import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";
import {
    FlexibleXYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
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
    const from = moment().subtract(10, "days").startOf("day").valueOf().toString();
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
        x: index, // moment().subtract(10 - index, "days").valueOf(),
        y: amount,
    }));

    return (
        <div className="container">
            <FlexibleXYPlot>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries
                    color="#7fdbff"
                    data={chartData}
                />
            </FlexibleXYPlot>
        </div>
    )
};

export default PaymentChart;
