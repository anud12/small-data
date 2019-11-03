import {Line} from "react-chartjs-2";
import * as React from "react";
import {CSSProperties} from "react";

type Props = {
    style?: CSSProperties
    name: string,
    x: Array<string>
    y: Array<string>,
    onClick?: (element: { x: string, y: string }) => void;
}
export const StepLineChart = (props: Props) => {
    return <div style={props.style}>
        <Line
            options={{
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    animationDuration: 150,
                },
                onClick: (event: any, array: any) => {
                    if (array && array[0]) {
                        const index = array[0]._index;
                        if (props.onClick) {
                            props.onClick({x: props.x[index], y: props.y[index]})
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                        }
                    }]
                }
            }}
            data={{
                labels: props.x,
                datasets: [
                    {
                        fill: true,
                        step: true,
                        steppedLine:"middle",
                        lineTension: 0.4,
                        borderColor: 'rgba(40,40,40,1)',
                        backgroundColor: 'rgba(40,40,40,0.5)',
                        showLine: true,
                        label: props.name,
                        data: props.y,
                    }
                ]
            }}/>
    </div>
}