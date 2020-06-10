import React from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";
import {
    FlexibleXYPlot,
    LabelSeries,
    VerticalBarSeries,
    XAxis,
    YAxis,
} from "react-vis";

import "./styles.scss";
import LoadingSpinner from "../../money-ui/LoadingSpinner";

const SPENDING_PER_DAY_QUERY = gql`
    query GetAmountsSpent($from: String!, $to: String!) {
        getAmountSpentPerDay(from: $from, to: $to)
    }
`,

    PaymentChart = () => {

        const from = moment().subtract(
                29,
                "days",
            ).
                startOf("day").
                valueOf().
                toString(),
            to = moment().startOf("day").
                valueOf().
                toString(),

            {loading, error, data} = useQuery(
                SPENDING_PER_DAY_QUERY,
                {
                    "variables": {from,
                        to},
                },
            );

        if (error) {

            alert("We are experiencing a problem");
            return;

        }

        if (loading) {

            return <LoadingSpinner />;

        }

        const {getAmountSpentPerDay} = data,

            chartData = getAmountSpentPerDay.map((amount, index) => ({
                "x": moment().subtract(
                    29 - index,
                    "days",
                ).
                    valueOf(),
                "y": amount,
                "label": `$${amount.toFixed(0)}`,
            }));

        return (
            <div className="container">
                <FlexibleXYPlot margin={{"top": 50,
                    "left": 50}}>
                    <YAxis
                        style={{"text": {"fontSize": 12}}}
                        tickFormat={(y) => `$${y}`}
                    />
                    <XAxis
                        style={{"text": {"fontSize": 12}}}
                        tickFormat={(x) => moment(x).format("M/D")}
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
        );

    };

export default PaymentChart;
