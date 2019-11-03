import {TextFile} from "../../input/directory-input";
import * as React from "react";
import {Component} from "react";
import {TransactionsByPartner} from "./transactions-bypartner";
import {LayoutColumn} from "../layout/layout-column";
import {Transaction} from "../type/transaction";
import {Frame} from "../frame";
import {LayoutLine} from "../layout/layout-line";
import {TagsDashboard} from "./tagsDashboard";
import {TransactionInterval} from "./transaction-interval";

type Props = {
    textFiles: Array<TextFile>
}

const getTransactionData = (files: Array<TextFile>): Array<Transaction> => {
    const file = files.find(value => value.name === "transactions.csv") || {content: ""};

    const result = file.content.split("\n")

        .map(value => {
            return value.split(";")
        })
        .filter(value => value[0] !== "id")
        .map(value => {
            return {
                id: value[0],
                date: value[1],
                account: value[2],
                description: value[3],
                partner: value[4],
                partnerAccount: value[5],
                accountName: value[6],
                operationDate: value[7],
                debit: value[8],
                credit: value[9],
                sold: value[10],
            } as Transaction
        })
    return result;
};

type  State = {
    page: Page
}

enum Page {
    TRANSACTION_BY_PARTNER = "Transactions by partner",
    TRANSACTION_INTERVAL = "Transaction Interval",
    TAGS = "Tags"
}

export class Dashboard extends Component<Props, State> {

    state: State = {
        page: Page.TAGS
    }

    onSetPage = (page: Page) => () => {
        this.setState({page})
    }
    render = () => {
        return <LayoutColumn>
            <LayoutLine>
                <h3>{this.state.page}</h3>
            </LayoutLine>
            <LayoutLine>
                {Object.values(Page).map((value: Page) =>
                    <button key={value}
                            style={{width: "100%"}}
                            onClick={this.onSetPage(value)}>
                        {value}
                    </button>
                )}
            </LayoutLine>

            <Frame show={this.state.page === Page.TRANSACTION_BY_PARTNER}>
                <TransactionsByPartner transactions={getTransactionData(this.props.textFiles)}/>
            </Frame>
            <Frame show={this.state.page === Page.TAGS}>
                <TagsDashboard
                    transactions={getTransactionData(this.props.textFiles)}
                    tags={[]}/>
            </Frame>
            <Frame show={this.state.page === Page.TRANSACTION_INTERVAL}>
                <TransactionInterval
                    transactions={getTransactionData(this.props.textFiles)}/>
            </Frame>
        </LayoutColumn>
    }
}
