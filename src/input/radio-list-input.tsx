import * as React from "react";

type Props<T> = {
    data: Array<T>,
    valueMapper?: (t: T) => string | undefined,
    labelMapper?: (t: T) => string | undefined,
    group: string,
    onClick: (t: T) => void,
}

export function RadioListInput<T>(props: Props<T>) {
    return <div>
        {props.data.map(value =>
            <label key={props.valueMapper ? props.valueMapper(value) : value + ""}
                   style={{display: "block"}}>
                <input
                    type={"radio"}
                    name={props.group}
                    value={props.valueMapper ? props.valueMapper(value) : value + ""}
                    onClick={() => props.onClick(value)}
                />
                {props.labelMapper ? props.labelMapper(value) : value}
            </label>)}
    </div>
}