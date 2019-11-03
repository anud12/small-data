import * as React from "react";
import {CSSProperties, PropsWithChildren} from "react";

type Props = {
    style?: CSSProperties
} & PropsWithChildren<{}>

export const LayoutColumn = (props: Props) => {
    return <div style={{
        display: "flex",
        maxHeight: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
        ...props.style,
    }}>
        {props.children}
    </div>
}