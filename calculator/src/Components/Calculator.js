import React, { useState, useEffect } from 'react';
import './Calculator.css';
import './NumberButton/NumberButton.css';
import Display from './Display/Display.js';
import NumberButton from './NumberButton/NumberButton.js';
import ModeButton from './ModeButton/ModeButton.js';
import OperatorButton from './OperatorButton/OperatorButton.js';

export default function Calculator() {
    const [selectedMode, setSelectedMode] = useState(1);


    const switchMode = (mode) => {
        setSelectedMode(mode);
    }

    return (
        <div id="main-container">
            <Display output={3} />
            <div id='mode-btns' key={selectedMode}>
                <OperatorButton className={'mode'} operator={'C'} />
                <ModeButton key={1} switchMode={switchMode} selected={selectedMode == 1 ? true : false} mode={1} />
                <ModeButton key={2} switchMode={switchMode} selected={selectedMode == 2 ? true : false} mode={2} />
                <ModeButton key={3} switchMode={switchMode} selected={selectedMode == 3 ? true : false} mode={3} />
            </div>
            <div id='buttons-container'>
                <div id='number-btns'>
                    {
                        [...Array(9)].map((x, i) =>
                            <NumberButton key={i+1} number={i + 1} />
                        )
                    }
                    <NumberButton key={0} className={'button'} number={0} />
                    <div className='button'></div>
                    <OperatorButton operator={'='} />
                </div>
                <div id='operator-btns'>
                    <OperatorButton operator={'/'} />
                    <OperatorButton operator={'x'} />
                    <OperatorButton operator={'-'} />
                    <OperatorButton operator={'+'} />
                </div>
            </div>
        </div>
    );
}