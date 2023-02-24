import React from 'react'
import Spacebar from "../components/Spacebar"
import { useNavigate } from "react-router-dom";

export default function Instructon() {
    const navigate = useNavigate();

    document.body.onkeyup = (e) => {
        if (e.key === " " || e.code === "Space") {
            navigate("/feedback", {state: {message: "FIND THE CHANGING ITEM!", next: "/color"}});
        }
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            fontSize: '1.75vw',
          }}>
            <div>
                <p>Dear Participant,</p>
                <p>Thank you for contributing!  Because there are very few trials in this study, it is very important that you first read these directions.</p>
                <ul>
                    <li>On each trial you will see some images flicker on and off.</li>
                    <li>Keep watching these flashes until you can find the one image that is changing.</li>
                    <li>On each trial, there is only 1 changing item, and you will know it when you find it (the changes are pretty big).</li>
                    <li>Once you are sure that you have found the changing item, PRESS THE SPACE BAR.</li>
                    <li>The picture will come back on and you then need to, CLICK THE PICTURE THAT WAS CHANGING.</li>
                    <li>Your data will only count if you click the changing item, so keep looking until you find it!</li>
                </ul>
                <p>There are three trials, each with different pictures.</p>
                <p>Let’s do the first!</p>
                <Spacebar />
            </div>
        </div>
    )
}