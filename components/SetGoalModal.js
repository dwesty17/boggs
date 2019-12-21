import React, {useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";

import "../styles.scss";

const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($updatedUser: UserInput!) {
        updateUser(updatedUser: $updatedUser) {
            id
            monthlySpendingGoal
        }
    }
`;

const SetGoalModal = ({ visible }) => {
    if (!visible) { return null; }

    const [monthlySpendingGoal, setMonthlySpendingGoal] = useState("");

    const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
        onCompleted() {},
        onError(error) {
            if (error) {
                console.error(error);
            }
        },
    });

    const handleSubmit = async () => {
        await updateUser({
            variables: { monthlySpendingGoal }
        });
    };

    return (
        <div className="modal-background">
            <section className="modal-main">
                <h2>Welcome to $$$!</h2>
                <p>Enter your monthly spending goal to get started!</p>
                <form className="set-goal">
                    <input
                        name="monthlySpendingGoal"
                        placeholder="Monthly goal"
                        type="number"
                        min="0"
                        step="100"
                        value={monthlySpendingGoal}
                        onChange={(event) => { setMonthlySpendingGoal(event.target.value); }}
                    />
                    <button
                        disabled={!monthlySpendingGoal || monthlySpendingGoal < 0}
                        onClick={handleSubmit}
                    >
                        Set goal
                    </button>
                </form>
            </section>
        </div>
    );
};

export default SetGoalModal;
