import React from 'react';
import '../styles/Square.css';
import { setColor } from '../utils/slices/colorSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

export default function Square(props) {
    const { spaceKey, style, payload } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = ({ left, top, background }) => {
        payload.correct = payload.changing_before === background || payload.changing_after === background;
        payload.selected = background;
        payload.selected_x = left.replace("%", "");
        payload.selected_y = top.replace("%", "");

        dispatch(setColor(payload));
        navigate("/feedback", {state: {correct: payload.correct, next: "/orientation"}});
    }

    return (
        <>
            <div className={spaceKey ? "decision" : "square"} style={style} onClick={() => handleClick(style)}/>
        </>   
    )
}