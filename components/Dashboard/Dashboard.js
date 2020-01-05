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
        dailyAmountSpent: getAmountSpent(from: $startOfDay)
        weeklyAmountSpent: getAmountSpent(from: $startOfWeek)
        monthlyAmountSpent: getAmountSpent(from: $startOfMonth)
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

    const dailyGoal = getDailyGoal(monthlySpendingGoal);
    const weeklyGoal = getWeeklyGoal(dailyGoal);
    const monthlyGoal = getMonthlyGoal(dailyGoal);

    const dailyPercentage = percentageOfGoal(dailyAmountSpent, dailyGoal);
    const weeklyPercentage = percentageOfGoal(weeklyAmountSpent, weeklyGoal);
    const monthlyPercentage = percentageOfGoal(monthlyAmountSpent, monthlyGoal);

    return (
        <div className="dashboard">
            {monthlySpendingGoal && <h2>This month's goal: ${monthlyGoal}</h2>}

            <div className="dashboard-row">
                <p>Daily spend: ${dailyAmountSpent.toFixed(2)} / ${dailyGoal}</p>
                <PercentageBar percentage={dailyPercentage} />
            </div>

            <div className="dashboard-row">
                <p>Weekly spend: ${weeklyAmountSpent.toFixed(2)} / ${weeklyGoal}</p>
                <PercentageBar percentage={weeklyPercentage} />
            </div>

            <div className="dashboard-row">
                <p>Monthly spend: ${monthlyAmountSpent.toFixed(2)} / ${monthlyGoal}</p>
                <PercentageBar percentage={monthlyPercentage} />
            </div>
        </div>
    );
};

const getDailyGoal = (monthlySpendingGoal) => ((monthlySpendingGoal * 12) / 365).toFixed(2);
const getWeeklyGoal = (dailyGoal) => (dailyGoal * 7).toFixed(2);
const getMonthlyGoal = (dailyGoal) => (dailyGoal * moment().daysInMonth()).toFixed(2);

const percentageOfGoal = (amount, goal) => (amount / goal) * 100;

export default Dashboard;
