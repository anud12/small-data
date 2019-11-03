import * as React from "react";
import {PropsWithChildren} from "react";
import {CSSProperties} from "react";

type Props = {
    style?: CSSProperties
} & PropsWithChildren<{}>

export const LayoutLine = (props: Props) => {

    return <div style={{
        display: "flex",
        justifyContent: "space-evenly",
        ...props.style,
    }}>
        {props.children}
    </div>
}