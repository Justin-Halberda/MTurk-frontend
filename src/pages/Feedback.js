import React, {useEffect} from 'react'
import Spacebar from "../components/Spacebar"
import { useNavigate, useLocation } from "react-router-dom";
import store from '../utils/store';

export default function Feedback(props) {
    const navigate = useNavigate();
    const { state } = useLocation();
    
    useEffect(() => {
        if (!store.getState().user.age) {
            navigate("/");
        }
    }, []);

    const { message, correct, next } = state;
    const messages = { true: "GREAT! YOU ARE CORRECT!", false: "OOPS! YOU CLICKED THE WRONG ONE!"}
    const colors = {true: "green", false: "#A30000"};

    document.body.onkeyup = (e) => {
        if (e.key === " " || e.code === "Space") {
            message ? navigate(next) : navigate("/feedback", {state: {message: next === "/" ? "Thanks for participating!" : "FIND THE CHANGING ITEM!", next: next}});
        }
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            fontSize: '4.0vw',
            fontFamily: "Calibri, sans-serif",
            color: `${message ? "#696969" : colors[correct] }`
        }}>
            <div>
                <p>{message ? message : messages[correct]}</p>
                
            </div>
            <div style={{
                    width: '95%',
                    position: 'fixed',
                    bottom: '15%'
                }}>
                    <Spacebar />
                </div>
        </div>    
    )
}