import React from "react";
import PropTypes from "prop-types";

import {withApollo} from "../lib/apollo";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import AuthenticatedPage from "../components/AuthenticatedPage";
import SetGoalModal from "../components/modals/SetGoalModal";
import SpendingPerDay from "../components/SpendingPerDay";
import PaymentChart from "../components/PaymentChart";
import TransactionsTable from "../components/TransactionsTable";

// TODO maybes add daily/weekly/monthly goals back

const IndexPage = ({loggedInUser}) => {
    return (
        <AuthenticatedPage>
            <SetGoalModal visible={!loggedInUser.monthlySpendingGoal}/>

            <div className="main-view">
                <div className="main-column">
                    <SpendingPerDay monthlySpendingGoal={loggedInUser.monthlySpendingGoal}/>
                </div>

                <div className="main-column">
                    <PaymentChart/>
                </div>

                <TransactionsTable/>
            </div>
        </AuthenticatedPage>
    );
};

IndexPage.getInitialProps = async (context) => {
    const {loggedInUser} = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.token) {
        redirect(context, "/login");
    }

    return {loggedInUser};
};

IndexPage.propTypes = {
    loggedInUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        monthlySpendingGoal: PropTypes.number,
    }).isRequired,
};

export default withApollo(IndexPage, { ssr: false });
