import React, {useState} from "react";
import PropTypes from "prop-types";

import "../styles.scss";
import "../components/AuthenticatedPage";
import {withApollo} from "../lib/apollo";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import AuthenticatedPage from "../components/AuthenticatedPage";
import SetGoalModal from "../components/modals/SetGoalModal";
import AddTransactionModal from "../components/modals/AddTransactionModal";
import Dashboard from "../components/Dashboard";
import TransactionsTable from "../components/TransactionsTable";

const IndexPage = ({loggedInUser}) => {
    const [showTransactionModal, setShowTransactionModal] = useState(false);

    return (
        <AuthenticatedPage>
            <SetGoalModal visible={!loggedInUser.monthlySpendingGoal}/>
            <AddTransactionModal
                visible={showTransactionModal}
                handleClose={() => { setShowTransactionModal(false); }}
            />

            <div className="main-view">
                <Dashboard monthlySpendingGoal={loggedInUser.monthlySpendingGoal}/>
                <TransactionsTable handleAddTransactionClick={() => { setShowTransactionModal(true); }}/>
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

export default withApollo(IndexPage);
