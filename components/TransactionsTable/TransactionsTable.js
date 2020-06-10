import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";
import {MdAdd} from "react-icons/md";

import "./styles.scss";
import LoadingSpinner from "../../money-ui/LoadingSpinner";
import AddTransactionModal from "../modals/AddTransactionModal";
import AddTransactionButton from "../AddTransactionButton";
import IconButton from "../IconButton";

const GET_TRANSACTIONS_QUERY = gql`
    query {
        getTransactions {
            id
            transactionTime
            amount
            transactee
            description
        }
    }
`,

    TransactionsTable = ({handleAddTransactionClick}) => {

        const [
                showTransactionModal,
                setShowTransactionModal,
            ] = useState(false),

            {loading, error, data} = useQuery(GET_TRANSACTIONS_QUERY);

        if (error) {

            alert("We are experiencing a problem");
            return;

        }

        if (loading) {

            return <LoadingSpinner />;

        }

        const transactions = data.getTransactions;

        if (transactions.length === 0) {

            return (
                <div className="transactions-table">
                    <TransactionsTableHeader handleAddTransactionClick={handleAddTransactionClick} />
                    <p>
You haven't recorded any transactions yet.
                    </p>
                </div>
            );

        }

        return (
            <div className="transactions-table">
                <AddTransactionModal
                    handleClose={() => {

                        setShowTransactionModal(false);

                    }}
                    visible={showTransactionModal}
                />
                <TransactionsTableHeader
                    handleAddTransactionClick={() => {

                        setShowTransactionModal(true);

                    }}
                />
                <table>
                    <tbody>
                        {transactions.map((transaction, index, transactions) => <TransactionsTableRow
                            key={transaction.id}
                            previousTransaction={index ? transactions[index - 1] : transactions[0]}
                            transaction={transaction}
                        />)}
                    </tbody>
                </table>
            </div>
        );

    },

    TransactionsTableHeader = ({handleAddTransactionClick}) => <div className="transactions-table-header">
        <h2>
Transactions
        </h2>
        <IconButton onClick={handleAddTransactionClick}>
            <MdAdd size={18} />
        </IconButton>
    </div>,
    TransactionsTableRow = ({transaction, previousTransaction}) => {

        const transactionMoment = moment(parseInt(transaction.transactionTime)),
            previousTransactionMoment = moment(parseInt(previousTransaction.transactionTime)),
            lastOfDay =
        transaction === previousTransaction ||
        transactionMoment.day() !== previousTransactionMoment.day()
    ;

        // TODO figure out how to make description column collapsible
        return (
            <tr className={lastOfDay ? "transactions-table-divider-row" : ""}>
                <td>
                    {lastOfDay ? transactionMoment.format("M/D") : ""}
                </td>
                <td>
                    {transactionMoment.format("LT")}
                </td>
                <td className="amount-column">
                $
                    {transaction.amount.toFixed(2)}
                </td>
                <td>
                    {transaction.transactee}
                </td>
                {/* <td className="description-column">*/}
                {/*    {transaction.description}*/}
                {/* </td>*/}
            </tr>
        );

    };

export default TransactionsTable;
