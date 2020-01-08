import React from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

import "./styles.scss";
import LoadingSpinner from "../LoadingSpinner";
import PercentageBar from "../PercentageBar";

const SPENDING_QUERIES = gql`
    query GetAmountsSpent(
        $from10: String!,
        $from20: String!,
        $from40: String!,
    ) {
        spendingIn10: getAmountSpent(from: $from10)
        spendingIn20: getAmountSpent(from: $from20)
        spendingIn40: getAmountSpent(from: $from40)
    }
`;

const SpendingPerDay = ({monthlySpendingGoal}) => {
    const tenDaysAgo = moment().subtract(10, "days").startOf("day").valueOf().toString();
    const twentyDaysAgo = moment().subtract(20, "days").startOf("day").valueOf().toString();
    const fortyDaysAgo = moment().subtract(40, "days").startOf("day").valueOf().toString();

    const {loading, error, data} = useQuery(SPENDING_QUERIES, {
        variables: {
            from10: tenDaysAgo,
            from20: twentyDaysAgo,
            from40: fortyDaysAgo,
        }
    });

    if (error) {
        alert("We are experiencing a problem");
        return;
    }

    if (loading) {
        return <LoadingSpinner/>;
    }

    const {
        spendingIn10,
        spendingIn20,
        spendingIn40,
    } = data;

    const dailyGoal = getDailyGoal(monthlySpendingGoal);

    const goalFor10 = getGoalForPeriod(dailyGoal, 10);
    const goalFor20 = getGoalForPeriod(dailyGoal, 20);
    const goalFor40 = getGoalForPeriod(dailyGoal, 40);

    const percentageFor10 = percentageOfGoal(spendingIn10, goalFor10);
    const percentageFor20 = percentageOfGoal(spendingIn20, goalFor20);
    const percentageFor40 = percentageOfGoal(spendingIn40, goalFor40);

    return (
        <div className="goal-progress">
            {monthlySpendingGoal && <h2>Spending</h2>}

            <div className="goal-progress-row">
                <p>Past 10 days: ${spendingIn10.toFixed(2)} / ${goalFor10}</p>
                <PercentageBar percentage={percentageFor10} />
            </div>

            <div className="goal-progress-row">
                <p>Past 20 days: ${spendingIn20.toFixed(2)} / ${goalFor20}</p>
                <PercentageBar percentage={percentageFor20} />
            </div>

            <div className="goal-progress-row">
                <p>Past 40 days: ${spendingIn40.toFixed(2)} / ${goalFor40}</p>
                <PercentageBar percentage={percentageFor40} />
            </div>
        </div>
    );
};

const getDailyGoal = (monthlySpendingGoal) => ((monthlySpendingGoal * 12) / 365).toFixed(2);
const getGoalForPeriod = (dailyGoal, days) => (dailyGoal * days).toFixed(2);

const percentageOfGoal = (amount, goal) => (amount / goal) * 100;

export default SpendingPerDay;
