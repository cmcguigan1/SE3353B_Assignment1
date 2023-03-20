import React, { useState, useEffect } from 'react';
import './NumberButton.css';

export default function NumberButton(props){
    const [number, setNumber] = useState(0);

    useEffect(() => {
        setNumber(props.number);
    }, [number]);

    return (
        <div className="button">
            { number && <div className='number'>{number}</div> }
        </div>
    );
}