import React from 'react';
import '../styles/Image.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setOrientation } from '../utils/slices/orientationSlice';
import { setTrial } from '../utils/slices/trialSlice';

export default function Image(props) {
    const { style, src, payload, type } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = ({ left, top, src }) => {
        payload.correct = payload.changing_before === src || payload.changing_after === src;
        payload.selected = src;
        payload.selected_x = left.replace("%", "");
        payload.selected_y = top.replace("%", "");

        if (type === "tial") { dispatch(setTrial(payload)) }
        else {
            dispatch(setOrientation(payload));
            navigate("/trial");
        }
    }
    return (
        <img src={require(`../assests/${src}`)} alt="could not load" className="image" style={style} />
    )
}