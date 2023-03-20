import React, { useState, useEffect } from 'react';
import './NumberButton.css';

export default function NumberButton(props){
    const [number, setNumber] = useState(0);

    useEffect(() => {
        setNumber(props.number);
    }, [props.number]);

    const onClick = () => {
        props.storeOperand(number);
    }

    return (
        <div onClick={onClick} className="button">
            { number && <div className='number'>{number}</div> }
        </div>
    );
}