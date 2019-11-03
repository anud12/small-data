import React, {Component} from "react";
import {LayoutLine} from "../layout/layout-line";
import {RadioListInput} from "../../input/radio-list-input";
import {LayoutColumn} from "../layout/layout-column";
import {LineChart} from "../chart/LineChart";
import {Transaction} from "../type/transaction";
import moment from "moment";
import {StepLineChart} from "../chart/StepLineChart";

type Props = {
    transactions: Array<Transaction>
}


type  State = {
    selectedPartnerName?: string,
    transactionData: Array<Transaction>,
    starDate: string;
    endDate: string;
}

export class TransactionInterval extends Component<Props, State> {


    state: State = {
        transactionData: [],
        starDate: moment().subtract(1, "month").format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
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

    getTransactionData = () => {
        return this.state.transactionData
            .filter(t => {
                if (this.state.endDate !== "" && this.state.starDate !== "") {
                    return moment(t.date, "YYYY-MM-DD").isSameOrAfter(moment(this.state.starDate))
                        && moment(t.date, "YYYY-MM-DD").isSameOrBefore(moment(this.state.endDate))
                }
                return true;
            });
    };

    render = () => {
        const transactionData = this.getTransactionData();
        return (
            <LayoutColumn>
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
                            data={[...new Set(transactionData.map(t => t.partner))]}
                            group="partner"
                            onClick={this.setPartnerName}/>
                    </div>
                    <LayoutColumn style={{flexGrow: 1}}>
                        <LayoutLine>
                            <div>
                                <label>
                                    Start Date
                                    <input type="date"
                                           value={this.state.starDate}
                                           onChange={({target: {value}}) => this.setState({starDate: value})}/>
                                </label>
                                <button>+</button>
                                <button>-</button>
                            </div>
                            <div>
                                <label>
                                    End date
                                    <input type="date"
                                           value={this.state.endDate}
                                           onChange={({target: {value}}) => this.setState({endDate: value})}/>
                                </label>
                                <button onChange={() => this.setState((prevState: State) => {
                                    return {endDate: moment(prevState.endDate, "YYYY-MM-DD").add(1, "month").format("YYYY-MM-DD")}
                                })}>+
                                </button>
                                <button>-</button>
                            </div>
                        </LayoutLine>
                        <LineChart
                            style={{flexGrow: 1}}
                            name={"Debit"}
                            onClick={element => console.log(element)}
                            x={transactionData.filter(v => v.debit !== "0")
                                .map(v => v.date)}
                            y={transactionData.filter(v => v.debit !== "0")
                                .map(v => v.debit)}/>
                        <StepLineChart
                            style={{flexGrow: 1}}
                            name={"Credit"}
                            onClick={element => console.log(element)}
                            x={transactionData.filter(v => v.credit !== "0" && v.credit !== "0.0")
                                .map(v => v.date)}
                            y={transactionData.filter(v => v.credit !== "0" && v.credit !== "0.0")
                                .map(v => v.credit)}/>
                        <LineChart
                            style={{flexGrow: 1}}
                            name={"Sold"}
                            onClick={element => console.log(element)}
                            x={transactionData.map(v => v.date)}
                            y={transactionData.map(v => v.sold)}/>
                    </LayoutColumn>
                </LayoutLine>

            </LayoutColumn>
        )
    }

}