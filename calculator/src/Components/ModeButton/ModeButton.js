import React, { useState, useEffect } from 'react';
import './ModeButton.css';

export default function ModeButton(props){
    const [mode, setMode] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(props.selected);
        if(props.mode == 1){
            setMode("INFIX");
        }
        else if(props.mode == 2){
            setMode("RPN");
        }
        else{
            setMode("PEDMAS");
        }
    }, [props.mode]);

    const onClick = () => {
        props.switchMode(props.mode);
    }

    return (
        <div className='mode-button-conatiner'>
            { mode && isSelected && 
                <div onClick={onClick} className="mode-button-selected">
                    <div className='mode'>{mode}</div>
                </div>
            }
            { mode && !isSelected &&
                <div onClick={onClick} className="mode-button">
                    <div className='mode'>{mode}</div>
                </div>
            }
        </div>
    );
}