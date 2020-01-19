import React from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

import "./styles.scss";
import LoadingSpinner from "../LoadingSpinner";
import PercentageBar from "../PercentageBar";

const SPENDING_QUERIES = gql`
    query GetAmountsSpent(
        $from5: String!,
        $from10: String!,
        $from20: String!,
    ) {
        spendingIn5: getAmountSpent(from: $from5)
        spendingIn10: getAmountSpent(from: $from10)
        spendingIn20: getAmountSpent(from: $from20)
    }
`;

const SpendingPerDay = ({monthlySpendingGoal}) => {
    const fiveDaysAgo = moment().subtract(4, "days").startOf("day").valueOf().toString();
    const tenDaysAgo = moment().subtract(9, "days").startOf("day").valueOf().toString();
    const twentyDaysAgo = moment().subtract(19, "days").startOf("day").valueOf().toString();

    const {loading, error, data} = useQuery(SPENDING_QUERIES, {
        variables: {
            from5: fiveDaysAgo,
            from10: tenDaysAgo,
            from20: twentyDaysAgo,
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
        spendingIn5,
        spendingIn10,
        spendingIn20,
    } = data;

    const dailyGoal = getDailyGoal(monthlySpendingGoal);

    const goalFor5 = getGoalForPeriod(dailyGoal, 5);
    const goalFor10 = getGoalForPeriod(dailyGoal, 10);
    const goalFor20 = getGoalForPeriod(dailyGoal, 20);

    const percentageFor5 = percentageOfGoal(spendingIn5, goalFor5);
    const percentageFor10 = percentageOfGoal(spendingIn10, goalFor10);
    const percentageFor20 = percentageOfGoal(spendingIn20, goalFor20);

    return (
        <div className="spending-per-day-container">
            {monthlySpendingGoal && <h2>Spending</h2>}

            <div className="spending-per-day-progress-row">
                <p>Past 5 days: ${spendingIn5.toFixed(2)} / ${goalFor5}</p>
                <PercentageBar percentage={percentageFor5} />
            </div>

            <div className="spending-per-day-progress-row">
                <p>Past 10 days: ${spendingIn10.toFixed(2)} / ${goalFor10}</p>
                <PercentageBar percentage={percentageFor10} />
            </div>

            <div className="spending-per-day-progress-row">
                <p>Past 20 days: ${spendingIn20.toFixed(2)} / ${goalFor20}</p>
                <PercentageBar percentage={percentageFor20} />
            </div>
        </div>
    );
};

const getDailyGoal = (monthlySpendingGoal) => ((monthlySpendingGoal * 12) / 365).toFixed(2);
const getGoalForPeriod = (dailyGoal, days) => (dailyGoal * days).toFixed(2);

const percentageOfGoal = (amount, goal) => (amount / goal) * 100;

export default SpendingPerDay;
