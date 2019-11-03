import {TextFile} from "../../input/directory-input";
import {Component, default as React} from "react";
import {LayoutLine} from "../layout/layout-line";
import {RadioListInput} from "../../input/radio-list-input";
import {LayoutColumn} from "../layout/layout-column";
import {LineChart} from "../chart/LineChart";
import {Transaction} from "../type/transaction";
import {StepLineChart} from "../chart/StepLineChart";

type Props = {
    transactions: Array<Transaction>
}


type  State = {
    selectedPartnerName?: string,
    transactionData: Array<Transaction>
}

export class TransactionsByPartner extends Component<Props, State> {

    state: State = {
        transactionData: []
    };

    componentDidMount(): void {
        this.setState({transactionData: this.props.transactions});
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({transactionData: nextProps.transactions})
    }

    setPartnerName = (selectedPartnerName: string | undefined) =>
        this.setState({selectedPartnerName}, () => {
            this.loadTransaction()
        });

    loadTransaction = () => {
        const transactions = this.props.transactions;

        this.setState((prevState) => {
            if (prevState.selectedPartnerName) {
                const transactionData = transactions
                    .filter(value => value.partner === prevState.selectedPartnerName);
                return {transactionData}
            } else {
                return {transactionData: transactions}
            }

        })
    };


    render = () => {
        return <LayoutColumn>
            <LayoutLine>
                <div style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 60.4333px - 30px)"
                }}>
                    <label style={{display: "block"}}>
                        <input type={"radio"}
                               name={"partner"}
                               value={undefined}
                               onClick={() => this.setPartnerName(undefined)}/>
                        All
                    </label>
                    <RadioListInput
                        data={[...new Set(this.state.transactionData.map(t => t.partner))]}
                        group="partner"
                        onClick={this.setPartnerName}/>
                </div>
                <LayoutColumn style={{flexGrow: 1}}>
                    <LineChart
                        style={{flexGrow: 1}}
                        name={"Debit"}
                        onClick={element => console.log(element)}
                        x={this.state.transactionData.filter(v => v.debit !== "0")
                            .map(v => v.date)}
                        y={this.state.transactionData.filter(v => v.debit !== "0")
                            .map(v => v.debit)}/>
                    <LineChart
                        style={{flexGrow: 1}}
                        name={"Credit"}
                        onClick={element => console.log(element)}
                        x={this.state.transactionData.filter(v => v.credit !== "0" && v.credit !== "0.0")
                            .map(v => v.date)}
                        y={this.state.transactionData.filter(v => v.credit !== "0" && v.credit !== "0.0")
                            .map(v => v.credit)}/>
                    <LineChart
                        style={{flexGrow: 1}}
                        name={"Sold"}
                        onClick={element => console.log(element)}
                        x={this.state.transactionData.map(v => v.date)}
                        y={this.state.transactionData.map(v => v.sold)}/>
                </LayoutColumn>
            </LayoutLine>

        </LayoutColumn>
    }
}
