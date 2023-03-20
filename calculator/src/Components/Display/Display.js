import React, { useState, useEffect } from 'react';
import './Display.css';

export default function Display(props){
    const [output, setOutput] = useState("0");
    const [idNm, setIdNm] = useState("");

    useEffect(() => {
        if(props.log){
            setIdNm("log");
            setOutput(`[${props.output.join(", ")}]`);
        }
        else{
            setIdNm("display");
            setOutput(props.output);
        }
    }, [props.output]);

    return (
        <div id={idNm}>
            { output && <span key={output} className='output'>{output}</span> }
        </div>
    );
}