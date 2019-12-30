import React from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

import LoadingSpinner from "./LoadingSpinner";

const GET_AMOUNTS_SPENT_QUERY = gql`
    query GetAmountsSpent(
        $startOfDay: String!,
        $startOfWeek: String!,
        $startOfMonth: String!,
    ) {
        dailyAmountSpent: getAmountSpent(since: $startOfDay)
        weeklyAmountSpent: getAmountSpent(since: $startOfWeek)
        monthlyAmountSpent: getAmountSpent(since: $startOfMonth)
    }
`;

const Dashboard = ({monthlySpendingGoal}) => {
    const {loading, error, data} = useQuery(GET_AMOUNTS_SPENT_QUERY, {
        variables: {
            startOfDay: moment().startOf("day").valueOf().toString(),
            startOfWeek: moment().startOf("week").valueOf().toString(),
            startOfMonth: moment().startOf("month").valueOf().toString(),
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
        dailyAmountSpent,
        weeklyAmountSpent,
        monthlyAmountSpent,
    } = data;

    const dailySpendingGoal = dailyGoal(monthlySpendingGoal);
    const weeklySpendingGoal = weeklyGoal(monthlySpendingGoal);

    const dailyPercentage = percentageOfGoal(dailyAmountSpent, dailySpendingGoal);
    const weeklyPercentage = percentageOfGoal(weeklyAmountSpent, weeklySpendingGoal);
    const monthlyPercentage = percentageOfGoal(monthlyAmountSpent, monthlySpendingGoal);

    return (
        <div className="dashboard">
            {monthlySpendingGoal && <h2>Monthly spending goal: ${monthlySpendingGoal}</h2>}
            <p>Daily spend: ${dailyAmountSpent.toFixed(2)} / ${dailySpendingGoal} ({dailyPercentage}%)</p>
            <p>Weekly spend: ${weeklyAmountSpent.toFixed(2)} / ${weeklySpendingGoal} ({weeklyPercentage}%)</p>
            <p>Monthly spend: ${monthlyAmountSpent.toFixed(2)} / ${monthlySpendingGoal} ({monthlyPercentage}%)</p>
        </div>
    );
};

const dailyGoal = (monthlySpendingGoal) => ((monthlySpendingGoal * 12) / 365).toFixed(2);
const weeklyGoal = (monthlySpendingGoal) => ((monthlySpendingGoal * 12) / 52).toFixed(2);

const percentageOfGoal = (amount, goal) => ((amount / goal) * 100).toFixed(1);

export default Dashboard;
