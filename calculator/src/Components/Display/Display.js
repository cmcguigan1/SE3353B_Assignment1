import React, { useState, useEffect } from 'react';
import './Display.css';

export default function Display(props){
    const [output, setOutput] = useState("0");

    useEffect(() => {
        setOutput(props.output);
    }, [output]);

    return (
        <div id="display">
            { output && <span className='output'>{output}</span> }
        </div>
    );
}