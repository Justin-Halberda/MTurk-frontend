import React from 'react';
import '../styles/Image.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setOrientation } from '../utils/slices/orientationSlice';
import { setTrial } from '../utils/slices/trialSlice';
import store from '../utils/store';
import mTurkAPI from '../services/mTurkAPI';

export default function Image(props) {
    const { spaceKey, style, src, payload, type } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const api = new mTurkAPI()

    const handleClick = async({ left, top }, src ) => {
        payload.correct = payload.changing_before === src || payload.changing_after === src;
        payload.selected = src;
        payload.selected_x = left.replace("%", "");
        payload.selected_y = top.replace("%", "");

        if (type === "trial") { 
            dispatch(setTrial(payload));
            await api.write(store.getState());
            navigate("/feedback", {state: {correct: payload.correct, next: "/"}});
        }
        else {
            dispatch(setOrientation(payload));
            navigate("/feedback", {state: {correct: payload.correct, next: "/trial"}});
        }
    }
    return (
        <>
            <img src={require(`../assests/${src}`)} alt="could not load" className={spaceKey ? "image-decision" : "image"} style={style} onClick={() => handleClick(style, src)}/>
        </>
    )
}