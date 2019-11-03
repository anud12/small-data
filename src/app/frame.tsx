import * as React from "react";
import {Component, Fragment, PropsWithChildren} from "react";

type Props = {
        show: boolean
    }
    & PropsWithChildren<{}>

export class Frame extends Component {
    constructor(public props: Props) {
        super(props)
    }

    render = () => {
        return this.props.show ?
            this.props.children :
            <Fragment/>
    }
}