import {DirectoryInput, TextFile} from "../input/directory-input";
import React from "react";

type Props = {
    onUpload: (textFiles: Array<TextFile>) => void
}

export const Upload = (props: Props) => (
    <label style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center"
    }}>
        <div style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            Load directory
        </div>
        <DirectoryInput style={{display: "none"}} onChange={props.onUpload}/>
    </label>
)