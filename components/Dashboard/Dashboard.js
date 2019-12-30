import React from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

import "./styles.scss";
import LoadingSpinner from "../LoadingSpinner";
import PercentageBar from "../PercentageBar";

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

            <div className="dashboard-row">
                <p>Daily spend: ${dailyAmountSpent.toFixed(2)} / ${dailySpendingGoal}</p>
                <PercentageBar percentage={dailyPercentage} />
            </div>

            <div className="dashboard-row">
                <p>Weekly spend: ${weeklyAmountSpent.toFixed(2)} / ${weeklySpendingGoal}</p>
                <PercentageBar percentage={weeklyPercentage} />
            </div>

            <div className="dashboard-row">
                <p>Monthly spend: ${monthlyAmountSpent.toFixed(2)} / ${monthlySpendingGoal}</p>
                <PercentageBar percentage={monthlyPercentage} />
            </div>
        </div>
    );
};

const dailyGoal = (monthlySpendingGoal) => ((monthlySpendingGoal * 12) / 365).toFixed(2);
const weeklyGoal = (monthlySpendingGoal) => ((monthlySpendingGoal * 12) / 52).toFixed(2);

const percentageOfGoal = (amount, goal) => (amount / goal) * 100;

export default Dashboard;
