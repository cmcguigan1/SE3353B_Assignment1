import React, { useState, useEffect } from 'react';
import './Calculator.css';
import './NumberButton/NumberButton.css';
import Display from './Display/Display.js';
import NumberButton from './NumberButton/NumberButton.js';
import ModeButton from './ModeButton/ModeButton.js';
import OperatorButton from './OperatorButton/OperatorButton.js';

export default function Calculator() {

    return (
        <div id="main-container">
            <Display output={3} />
            <div id='mode-btns'>
                <OperatorButton className={'mode'} operator={'C'} />
                <ModeButton mode={'INFIX'} />
                <ModeButton mode={'RPN'} />
                <ModeButton mode={'3'} />
            </div>
            <div id='buttons-container'>
                <div id='number-btns'>
                    {
                        [...Array(9)].map((x, i) =>
                            <NumberButton number={i + 1} />
                        )
                    }
                    <NumberButton number={0} />
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