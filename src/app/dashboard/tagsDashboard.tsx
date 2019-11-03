import {Component} from "react";
import * as React from "react";
import {Transaction} from "../type/transaction";
import {TransactionTag} from "../type/Transaction-tag";
import {LayoutColumn} from "../layout/layout-column";
import {LayoutLine} from "../layout/layout-line";

type Props = {
    transactions: Array<Transaction>
    tags: Array<TransactionTag>
}

type State = {
    selectedId: string
}

export class TagsDashboard extends Component<Props, State> {

    state: State = {
        selectedId: ""
    }

    componentDidMount(): void {
        console.log(this.props);
    }

    onTransactionSelect = (transactionId: string) => () => {
        this.setState({selectedId: transactionId})
    }

    render = () => {
        return <div>
            <LayoutLine>
                <LayoutColumn style={{
                    maxHeight: "calc(100vh - 60.4333px - 30px)",
                    flexGrow: 0.5
                }}>
                    <table>
                        <thead>
                        <tr>
                            <th/>
                            <th>Partner</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.transactions.map(t =>
                            <tr key={t.id}
                                onClick={this.onTransactionSelect(t.id)}>
                                <td>
                                    <input
                                        readOnly
                                        type="radio"
                                        radioGroup={"transaction"}
                                        checked={this.state.selectedId === t.id}
                                    />
                                </td>
                                <td>{t.partner}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </LayoutColumn>
                <div style={{
                    flexGrow: 1
                }}>
                    <h5>{this.state.selectedId}</h5>
                    <textarea
                        style={{
                            width: "100%",
                            resize: "vertical"
                        }}
                        rows={4}
                    />
                    <button style={{width: "100%"}}>
                        Save
                    </button>
                </div>
            </LayoutLine>
        </div>
    }
}