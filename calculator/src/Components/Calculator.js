import React, { useState, useEffect } from 'react';
import './Calculator.css';
import './NumberButton/NumberButton.css';
import Display from './Display/Display.js';
import NumberButton from './NumberButton/NumberButton.js';
import ModeButton from './ModeButton/ModeButton.js';
import OperatorButton from './OperatorButton/OperatorButton.js';

const math = require('mathjs');

export default function Calculator() {
    const [selectedMode, setSelectedMode] = useState(1);
    const [output, setOutput] = useState("0");

    const reset = (x) => {
        setOutput("0");
        setSelectedMode(1);
    }

    const evaluate = (x) => {
        console.log("in eval");
        if (selectedMode === 3) {
            try {
                let result = math.evaluate(output);
                setOutput(result);
            }
            catch (err) {
                setOutput('err');
            }
        }
        else {
            let arrayOfNumbers = output.split(/[*,/,+,-]+/); // array of just the numbers
            let result = 0; // holding the running calculated result
            let i = 0; // pointer for the array of numbers
            try {
                for (let char of output) {
                    // if we're looking at the first number
                    if (i == 0) {
                        if (char === '+') {
                            result = (Number(arrayOfNumbers[i]) + Number(arrayOfNumbers[i + 1]));
                            i += 2;
                        }
                        else if (char === '*') {
                            result = (Number(arrayOfNumbers[i]) * Number(arrayOfNumbers[i + 1]));
                            i += 2;
                        }
                        else if (char === '-') {
                            result = (Number(arrayOfNumbers[i]) - Number(arrayOfNumbers[i + 1]));
                            i += 2;
                        }
                        else if (char === '/') {
                            result = (Number(arrayOfNumbers[i]) / Number(arrayOfNumbers[i + 1]));
                            i += 2;
                        }
                        else { }
                    }
                    // otherwise, use the result as one of the operands
                    else {
                        if (char === '+') {
                            result = (result + Number(arrayOfNumbers[i]));
                            i += 1;
                        }
                        else if (char === '*') {
                            result = (result * Number(arrayOfNumbers[i]));
                            i += 1;
                        }
                        else if (char === '-') {
                            result = (result - Number(arrayOfNumbers[i]));
                            i += 1;
                        }
                        else if (char === '/') {
                            result = (result / Number(arrayOfNumbers[i]));
                            i += 1;
                        }
                        else { }
                    }
                }
                setOutput(String(result));
            }
            catch (err) {
                setOutput('err');
            }
        }
    }

    const enter = (x) => {
        console.log("in enter");
    }

    const storeOperator = (operator) => {
        setOutput((prev) => prev + ` ${operator} `);
    }

    const storeOperand = (number) => {
        setOutput((prev) => {
            if (prev === "0") {
                return number;
            }
            else {
                return prev + `${number}`;
            }
        });
    }

    const switchMode = (mode) => {
        setOutput("0");
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
                            <NumberButton storeOperand={storeOperand} key={i + 1} number={i + 1} />
                        )
                    }
                    <NumberButton storeOperand={storeOperand} key={0} number={0} />
                    { selectedMode === 1 && <OperatorButton operation={enter} operator={'Enter'} /> }
                    { selectedMode === 2 && <OperatorButton operation={enter} operator={'Enter'} /> }
                    { selectedMode === 3 &&
                        <div id="parentheses-container">
                            <OperatorButton operation={storeOperator} operator={'('} />
                            <OperatorButton operation={storeOperator} operator={')'} />
                        </div>
                    }
                    <OperatorButton operation={evaluate} operator={'='} />
                </div>
                <div id='operator-btns'>
                    <OperatorButton operation={storeOperator} operator={'/'} />
                    <OperatorButton operation={storeOperator} operator={'*'} />
                    <OperatorButton operation={storeOperator} operator={'-'} />
                    <OperatorButton operation={storeOperator} operator={'+'} />
                </div>
            </div>
        </div>
    );
}