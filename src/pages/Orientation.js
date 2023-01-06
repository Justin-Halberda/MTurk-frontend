import React, { useState, useEffect } from 'react'
import Image from '../components/Image'

const imgStyles = [
    {style: { left:"5%", top: "7%", width: "80px", height: "170px", writable: true}, src: "1"},
    {style: { left: "10%", top: "60%", width: "100px", height: "170px"}, src: "3"},
    {style: { left: "30%", top: "20%", width: "150px", height: "100px"}, src: "5"},
    {style: { left: "35%", top: "75%", width: "100px", height: "170px"}, src: "6"},
    {style: { left: "53%", top: "50%", width: "40px", height: "150px"}, src: "2"},
    {style: { left: "65%", top: "15%", width: "40px", height: "150px"}, src: "4"},
    {style: { left: "75%", top: "65%", width: "80px", height: "170px"}, src: "7"},
    {style: { left: "85%", top: "30%", width: "175px", height: "90px"}, src: "8"},
];

export default function Orientation() {
    const [ origBrick, setOrigBrick ] = useState(Math.floor(Math.random() * 8));
    const [ blank, setBlank ] = useState(true);
    const [ newBrick, setNewBrick ] = useState(Math.floor(Math.random() * 8));
    const [ spaceKey, setSpaceKey ] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());

    while (origBrick === newBrick) {
        setNewBrick(Math.floor(Math.random() * 8));
    }

    useEffect(() => {
        if (spaceKey) {
            setBlank(false);
            return;
        }

        const interval = setInterval(() => {
            setBlank(!blank);
            if (blank) { 
                imgStyles[origBrick - 1].src == origBrick ? imgStyles[origBrick - 1].src = newBrick : imgStyles[origBrick - 1].src = origBrick;
            }

        }, 1000);
        return () => clearInterval(interval);
    }, [blank]);

    document.body.onkeyup = (e) => {
        if (e.key === " " || e.code === "Space") {
            const endTime = Date.now();
            const duration = endTime - startTime;
            setSpaceKey(true);
        }
    }

    return (blank ? <div></div> : imgStyles.map((img, key) => (
        <Image className = {spaceKey ? "decision" : ""} style = {img.style} src = {`bricks/${img.src}.jpg`}/>
    )));
}