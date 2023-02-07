import React, { useState, useEffect } from 'react'
import Square from '../components/Square'
import { useNavigate } from "react-router-dom";
import store from '../utils/store';

const squaresStyles = [
    { left:"5%", top: "7%", background: "blue", writable: true},
    { left: "10%", top: "60%", background: "orange"},
    { left: "30%", top: "20%", background: "green"},
    { left: "35%", top: "75%", background: "brown"},
    { left: "53%", top: "50%", background: "purple"},
    { left: "65%", top: "15%", background: "aqua"},
    { left: "75%", top: "65%", background: "pink"},
    { left: "85%", top: "30%", background: "gold"},
];

const extraColors = ["red", "silver", "grey", "yellow"];

export default function Color() {
    const [ colorIndex, setColorIndex ] = useState(Math.floor(Math.random() * 4));
    const [ styleIndex, setStyleIndex ] = useState(Math.floor(Math.random() * 8));
    const [ blank, setBlank ] = useState(true);
    const [ color, setColor ] = useState(extraColors[colorIndex]);
    const [ spaceKey, setSpaceKey ] = useState(false);
    const [ origColor, setOrigColor ] = useState(squaresStyles[styleIndex].background);
    const [ startTime, setStartTime ] = useState(Date.now());
    const [ payload, setPayload ] = useState({
        changing_before: origColor,
        changing_after: color,
        changing_x: squaresStyles[styleIndex].left.replace("%", ""),
        changing_y: squaresStyles[styleIndex].top.replace("%", ""),
        colors_used: squaresStyles.map((style, key) => { return style.background })
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!store.getState().user.age) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (spaceKey) {
            setBlank(false);
            return;
        }

        const interval = setInterval(() => {
            setBlank(!blank);
            if (blank) { 
                let temp = squaresStyles[styleIndex].background;
                squaresStyles[styleIndex] = { left: squaresStyles[styleIndex].left, top: squaresStyles[styleIndex].top, background: color};
                setColor(temp);
            }

        }, 1000);
        return () => clearInterval(interval);
    }, [blank]);

    document.body.onkeyup = (e) => {
        if (e.key === " " || e.code === "Space") {
            const endTime = Date.now();
            const duration = endTime - startTime;
            setPayload({
                ...payload,
                time: duration
            });
            setSpaceKey(true);
        }
    }

    return (blank ? <div></div> : squaresStyles.map((style, key) => (
        <Square spaceKey = {spaceKey} style = {style} payload = {payload}/>
    )));
}