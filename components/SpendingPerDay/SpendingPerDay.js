import React from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

import "./styles.scss";
import LoadingSpinner from "../LoadingSpinner";
import PercentageBar from "../PercentageBar";

const GET_SPENDING_PER_DAY_QUERY = gql`
    query GetAmountsSpent($from: String!, $to: String!) {
#        spendingPerDay: getAmountSpentPerDay(from: $from, to: $to)
        totalAmountSpent: getAmountSpent(from: $from, to: $to)
    }
`;

const SpendingPerDay = ({monthlySpendingGoal}) => {
    const {loading, error, data} = useQuery(GET_SPENDING_PER_DAY_QUERY, {
        variables: {
            from: moment().subtract(10, "days").valueOf().toString(),
            to: moment().valueOf().toString(),
        }
    });

    // if (error) {
    //     alert("We are experiencing a problem");
    //     return;
    // }
    //
    // if (loading) {
    //     return <LoadingSpinner/>;
    // }

    if (!data) { return null; }

    const {
        totalAmountSpent,
    } = data;

    const dailyGoal = getDailyGoal(monthlySpendingGoal);
    const goalForPeriod = getTotalGoalForPeriod(dailyGoal);

    const percentage = percentageOfGoal(totalAmountSpent, goalForPeriod);

    return (
        <div className="spending-per-day-container">
            <div className="goal-progress-row">
                <p>Daily spend: ${totalAmountSpent.toFixed(2)} / ${goalForPeriod}</p>
                <PercentageBar percentage={percentage} />
            </div>
        </div>
    );
};

const getDailyGoal = (monthlySpendingGoal) => ((monthlySpendingGoal * 12) / 365).toFixed(2);
const getTotalGoalForPeriod = (dailyGoal) => (dailyGoal * 10).toFixed(2);

const percentageOfGoal = (amount, goal) => (amount / goal) * 100;

export default SpendingPerDay;
