import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Feedback(props) {
    const { correct, exit, next } = props;
    const navigate = useNavigate();
    
    return (
        <div>
            {correct ? <h1>Right Choice</h1> : <h1>Wrong Choice</h1>}
            <button onClick={() => navigate(next)}> {exit ? "Start Again" : "Proceed"} </button>
        </div>
    )
}