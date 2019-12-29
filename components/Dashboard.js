import React from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

import "../styles.scss";
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

    return (
        <div className="dashboard">
            {monthlySpendingGoal && <h2>Monthly spending goal: ${monthlySpendingGoal}</h2>}
            <p>Daily spending: ${dailyAmountSpent.toFixed(2)} / ${dailyGoal(monthlySpendingGoal).toFixed(2)}</p>
            <p>Weekly spending: ${weeklyAmountSpent.toFixed(2)} / ${weeklyGoal(monthlySpendingGoal).toFixed(2)}</p>
            <p>Monthly spending: ${monthlyAmountSpent.toFixed(2)} / ${monthlySpendingGoal.toFixed(2)}</p>

            <h2>Adjusted</h2>
            TODO
        </div>
    );
};

const dailyGoal = (monthlySpendingGoal) => (monthlySpendingGoal * 12) / 365;
const weeklyGoal = (monthlySpendingGoal) => (monthlySpendingGoal * 12) / 52;

export default Dashboard;
