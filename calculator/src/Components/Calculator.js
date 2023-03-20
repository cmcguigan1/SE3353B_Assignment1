import React, { useState, useEffect } from 'react';
import './Calculator.css';
import './NumberButton/NumberButton.css';
import Display from './Display/Display.js';
import NumberButton from './NumberButton/NumberButton.js';
import ModeButton from './ModeButton/ModeButton.js';
import OperatorButton from './OperatorButton/OperatorButton.js';
import { CSVLink } from "react-csv";

const math = require('mathjs');

export default function Calculator() {
    const [selectedMode, setSelectedMode] = useState(1);
    const [output, setOutput] = useState("0");
    const [stack, setStack] = useState([]);
    const [log, setLog] = useState([]);

    const headers = [
        { label: "Keystroke", key: "keystroke" },
        { label: "Timestamp", key: "timestamp" },
        { label: "Mode", key: "mode" },
    ];

    const reset = (x) => {
        setOutput("0");
        setSelectedMode(1);
        appendLog("C");
    }

    const evaluate = (x) => {
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
        appendLog("=");
    }

    const enter = (x) => {
        setStack((oldArray) => [...oldArray, output]);
        setOutput("0");
        appendLog("enter");
    }

    const evaluateV2 = (operator) => {
        let popFromStackElement = null;
        let updatedStack = [];

        if(stack.length === 0){
            popFromStackElement = 0;
        }
        else{
            stack.forEach((e, i) => {
                // if it's the last element in the array, pop it
                if(i == stack.length-1){
                    popFromStackElement = e;
                }
                else {
                    updatedStack.push(e);
                }
            });
        }
        try{
            let result = math.evaluate(`${output}${operator}${popFromStackElement}`);
            setOutput(result);
            setStack(updatedStack);
        }
        catch(err){
            setOutput('err');
        }
        appendLog(operator);
    }

    const storeOperator = (operator) => {
        setOutput((prev) => prev + ` ${operator} `);
        appendLog(operator);
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
        appendLog(number);
    }

    const switchMode = (mode) => {
        setOutput("0");
        setSelectedMode(mode);
    }

    const appendLog = (keystroke) => {
        let newEntry = {keystroke: keystroke, timestamp: Date.now(), mode: selectedMode};
        setLog((oldArray) => [...oldArray, newEntry]);
    }

    return (
        <div id="main-container">
            { selectedMode === 2 
                ? <div>
                    <Display log={true} key={stack} output={stack} />
                    <Display key={output} output={output} />
                </div>
                : <Display key={output} output={output} />
            }
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
                    <div className='button' onClick={() => storeOperand(0)}>
                        <div className='number'>0</div>
                    </div>
                    { selectedMode === 1 && <CSVLink className="log-btn" data={log} headers={headers}>Log</CSVLink> }
                    { selectedMode === 2 && <OperatorButton operation={enter} operator={'Enter'} /> }
                    { selectedMode === 3 &&
                        <div id="parentheses-container">
                            <OperatorButton operation={storeOperator} operator={'('} />
                            <OperatorButton operation={storeOperator} operator={')'} />
                        </div>
                    }
                    <OperatorButton operation={evaluate} operator={'='} />
                </div>
                { selectedMode === 2 
                    ? <div id='operator-btns'>
                        <OperatorButton operation={evaluateV2} operator={'/'} />
                        <OperatorButton operation={evaluateV2} operator={'*'} />
                        <OperatorButton operation={evaluateV2} operator={'-'} />
                        <OperatorButton operation={evaluateV2} operator={'+'} />
                    </div>
                    : <div id='operator-btns'>
                        <OperatorButton operation={storeOperator} operator={'/'} />
                        <OperatorButton operation={storeOperator} operator={'*'} />
                        <OperatorButton operation={storeOperator} operator={'-'} />
                        <OperatorButton operation={storeOperator} operator={'+'} />
                    </div>
                }
            </div>
        </div>
    );
}