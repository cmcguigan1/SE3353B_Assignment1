import React, { useState, useEffect } from 'react';
import './Calculator.css';
import './NumberButton/NumberButton.css';
import Display from './Display/Display.js';
import NumberButton from './NumberButton/NumberButton.js';
import ModeButton from './ModeButton/ModeButton.js';
import OperatorButton from './OperatorButton/OperatorButton.js';

export default function Calculator() {
    const [selectedMode, setSelectedMode] = useState(1);
    const [output, setOutput] = useState("0");

    const reset = (x) => {
        setOutput("0");
        setSelectedMode(1);
    }
    
    const evaluate = (x) => {
        console.log("in eval");
    }

    const storeOperator = (operator) => {
        setOutput((prev) => prev + ` ${operator} `);
    }

    const storeOperand = (number) => {
        setOutput((prev) => {
            if(prev === "0"){
                return number;
            }
            else{
                return prev + `${number}`;
            }
        });
    }

    const switchMode = (mode) => {
        setSelectedMode(mode);
    }

    return (
        <div id="main-container">
            <Display key={output} output={output} />
            <div id='mode-btns' key={selectedMode}>
                <OperatorButton operation={reset} className={'mode'} operator={'C'} />
                <ModeButton key={1} switchMode={switchMode} selected={selectedMode == 1 ? true : false} mode={1} />
                <ModeButton key={2} switchMode={switchMode} selected={selectedMode == 2 ? true : false} mode={2} />
                <ModeButton key={3} switchMode={switchMode} selected={selectedMode == 3 ? true : false} mode={3} />
            </div>
            <div id='buttons-container'>
                <div id='number-btns'>
                    {
                        [...Array(9)].map((x, i) =>
                            <NumberButton storeOperand={storeOperand} key={i+1} number={i + 1} />
                        )
                    }
                    <NumberButton storeOperand={storeOperand} key={0} className='button' number={0} />
                    <div className='button'></div>
                    <OperatorButton operation={evaluate} operator={'='} />
                </div>
                <div id='operator-btns'>
                    <OperatorButton operation={storeOperator} operator={'/'} />
                    <OperatorButton operation={storeOperator} operator={'x'} />
                    <OperatorButton operation={storeOperator} operator={'-'} />
                    <OperatorButton operation={storeOperator} operator={'+'} />
                </div>
            </div>
        </div>
    );
}