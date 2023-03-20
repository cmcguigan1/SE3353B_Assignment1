import React, { useState, useEffect } from 'react';
import './ModeButton.css';

export default function ModeButton(props){
    const [mode, setMode] = useState("");

    useEffect(() => {
        setMode(props.mode);
    }, [mode]);

    return (
        <div className="mode-button">
            { mode && <div className='mode'>{mode}</div> }
        </div>
    );
}