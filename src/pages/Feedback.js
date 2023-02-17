import React from 'react'
import Spacebar from "../components/Spacebar"
import { useNavigate } from "react-router-dom";

export default function Feedback(props) {
    const { message, next, color } = props;

    const navigate = useNavigate();

    document.body.onkeyup = (e) => {
        if (e.key === " " || e.code === "Space") {
            navigate({next});
        }
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            "font-size": '1.75vw',
            color: {color}
          }}>
            <div>
                <h1>{message ? message : "FIND THE CHANGING ITEM!"}</h1>
                <Spacebar />
            </div>
        </div>
    )
}