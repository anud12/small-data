import * as React from "react";
import {CSSProperties} from "react";

export type Props = {
    onChange: (textFile: Array<TextFile>) => void,
    style?: CSSProperties,
    className?: string,
    id?: string
}

export type TextFile = {
    name: string,
    content: string
}


const fileToTextFile = (file: File): Promise<TextFile> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e: any) {
            resolve({
                name: file.name,
                content: e.target.result
            })
        }
        reader.onerror = reject;
        reader.readAsText(file);
    })
}

export const DirectoryInput = (props: Props) => {
    // @ts-ignore
    return <input type="file"
                  multiple={true}
                  // webkitdirectory=""
                  // mozdirectory=""
                  // directory=""
                  style={props.style}
                  className={props.className}
                  onChange={({target: {files}}) => {
                      Promise.all([...files].map(fileToTextFile))
                          .then(props.onChange)
                  }}/>
}