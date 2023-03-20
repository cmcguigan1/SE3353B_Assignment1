import React, { useState, useEffect } from 'react';
import './OperatorButton.css';

export default function OperatorButton(props){
    const [operator, setOperator] = useState("");

    useEffect(() => {
        setOperator(props.operator);
    }, [operator]);

    const onClick = () => {
        props.operation(operator);
    }

    return (
        <div onClick={onClick} className="operator-button">
            { operator && <div className='operator'>{operator}</div> }
        </div>
    );
}