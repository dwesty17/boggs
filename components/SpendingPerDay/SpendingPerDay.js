import React from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

import "./styles.scss";
import LoadingSpinner from "../LoadingSpinner";
import PercentageBar from "../PercentageBar";

const SPENDING_QUERIES = gql`
    query GetAmountsSpent(
        $from7: String!,
        $from14: String!,
        $from30: String!,
    ) {
        spendingIn7: getAmountSpent(from: $from7)
        spendingIn14: getAmountSpent(from: $from14)
        spendingIn30: getAmountSpent(from: $from30)
    }
`;

const SpendingPerDay = ({monthlySpendingGoal}) => {
    const sevenDaysAgo = moment().subtract(6, "days").startOf("day").valueOf().toString();
    const tenDaysAgo = moment().subtract(13, "days").startOf("day").valueOf().toString();
    const twentyDaysAgo = moment().subtract(29, "days").startOf("day").valueOf().toString();

    const {loading, error, data} = useQuery(SPENDING_QUERIES, {
        variables: {
            from7: sevenDaysAgo,
            from14: tenDaysAgo,
            from30: twentyDaysAgo,
        },
    });

    if (error) {
        alert("We are experiencing a problem");
        return;
    }

    if (loading) {
        return <LoadingSpinner/>;
    }

    const {
        spendingIn7,
        spendingIn14,
        spendingIn30,
    } = data;

    const dailyGoal = getDailyGoal(monthlySpendingGoal);

    const goalFor7 = getGoalForPeriod(dailyGoal, 7);
    const goalFor14 = getGoalForPeriod(dailyGoal, 14);
    const goalFor30 = getGoalForPeriod(dailyGoal, 30);

    const percentageFor7 = percentageOfGoal(spendingIn7, goalFor7);
    const percentageFor14 = percentageOfGoal(spendingIn14, goalFor14);
    const percentageFor30 = percentageOfGoal(spendingIn30, goalFor30);

    return (
        <div className="spending-per-day-container">
            {monthlySpendingGoal && <h2>Spending</h2>}

            <div className="spending-per-day-progress-row">
                <p>Past 7 days: ${spendingIn7.toFixed(2)} / ${goalFor7}</p>
                <PercentageBar percentage={percentageFor7} />
            </div>

            <div className="spending-per-day-progress-row">
                <p>Past 14 days: ${spendingIn14.toFixed(2)} / ${goalFor14}</p>
                <PercentageBar percentage={percentageFor14} />
            </div>

            <div className="spending-per-day-progress-row">
                <p>Past 30 days: ${spendingIn30.toFixed(2)} / ${goalFor30}</p>
                <PercentageBar percentage={percentageFor30} />
            </div>
        </div>
    );
};

const getDailyGoal = (monthlySpendingGoal) => ((monthlySpendingGoal * 12) / 365).toFixed(2);
const getGoalForPeriod = (dailyGoal, days) => (dailyGoal * days).toFixed(2);

const percentageOfGoal = (amount, goal) => (amount / goal) * 100;

export default SpendingPerDay;
