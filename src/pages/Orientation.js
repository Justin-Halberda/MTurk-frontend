import React, { useState, useEffect } from 'react'
import Image from '../components/Image'
import { useNavigate } from "react-router-dom";
import store from '../utils/store';

const imgStyles = [
    {style: { left:"5%", top: "7%", width: "100px", height: "170px", writable: true}, src: "1"},
    {style: { left: "10%", top: "60%", width: "170px", height: "170px"}, src: "3"},
    {style: { left: "30%", top: "20%", width: "170px", height: "100px"}, src: "5"},
    {style: { left: "35%", top: "75%", width: "170px"}, src: "6"},
    {style: { left: "53%", top: "50%", width: "170px", height: "50px"}, src: "2"},
    {style: { left: "65%", top: "15%", width: "50px", height: "165px"}, src: "4"},
    {style: { left: "75%", top: "65%", width: "90px", height: "175px"}, src: "7"},
    {style: { left: "85%", top: "30%", width: "175px", height: "90px"}, src: "8"},
];

export default function Orientation() {
    const [ origBrick, setOrigBrick ] = useState(Math.floor(Math.random() * 8));
    const [ blank, setBlank ] = useState(true);
    const [ newBrick, setNewBrick ] = useState(Math.floor(Math.random() * 8));
    const [ brick, setBrick ] = useState({style: { left: imgStyles[origBrick].style.left, top: imgStyles[origBrick].style.top, width: imgStyles[newBrick].style.width, height: imgStyles[newBrick].style.height}, src: imgStyles[newBrick].src});
    const [ spaceKey, setSpaceKey ] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [ payload, setPayload ] = useState({
        changing_before: "bricks/" + imgStyles[origBrick].src + ".jpg",
        changing_after: "bricks/" + brick.src + ".jpg",
        changing_x: imgStyles[origBrick].style.left.replace("%", ""),
        changing_y: imgStyles[origBrick].style.top.replace("%", ""),
        images_used: [1,2,3,4,5,6,7,8]
    });

    while (origBrick === newBrick) {
        setNewBrick(Math.floor(Math.random() * 8));
        setBrick({style: { left: imgStyles[origBrick].style.left, top: imgStyles[origBrick].style.top, width: imgStyles[newBrick].style.width, height: imgStyles[newBrick].style.height}, src: imgStyles[newBrick].src});
        setPayload({
            ...payload,
            changing_after: "bricks/" + brick.src + ".jpg"
        });
    }

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
                let temp = imgStyles[origBrick];
                imgStyles[origBrick] = brick;
                setBrick(temp);
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

    return (blank ? <div></div> : imgStyles.map((img, key) => (
        <Image spaceKey = {spaceKey} style = {img.style} src = {`bricks/${img.src}.jpg`} payload = {payload} type={"orientation"}/>
    )));
}