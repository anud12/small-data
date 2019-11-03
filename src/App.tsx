import React, {Component, Fragment} from "react";
import {TextFile} from "./input/directory-input";
import {Frame} from "./app/frame";
import {Upload} from "./app/upload";
import {Dashboard} from "./app/dashboard/dashboard";

type State = {
    textFiles: Array<TextFile>
}

export class App extends Component<{}, State> {
    state: State = {
        textFiles: []
    };

    render = () => (
        <Fragment>
            <Frame show={this.state.textFiles.length === 0}>
                <Upload onUpload={textFiles => {
                    this.setState({textFiles})
                }
                }/>
            </Frame>
            <Frame show={this.state.textFiles.length > 0}>
                <Dashboard textFiles={this.state.textFiles}/>
            </Frame>

        </Fragment>
    )
};