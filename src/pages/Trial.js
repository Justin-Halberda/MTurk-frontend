import React, { useState, useEffect } from 'react'
import Image from '../components/Image'

const imgStyles = [
    {style: { left:"5%", top: "7%", writable: true}, src: "BFH/BFH" + Math.floor(Math.random() * 10) + ".jpg"},
    {style: { left: "10%", top: "60%"}, src: "BFL/BFL" + Math.floor(Math.random() * 10) + ".jpg"},
    {style: { left: "30%", top: "20%"}, src: "BMH/BMH" + Math.floor(Math.random() * 10) + ".jpg"},
    {style: { left: "35%", top: "75%"}, src: "BML/BML" + Math.floor(Math.random() * 10) + ".jpg"},
    {style: { left: "53%", top: "50%"}, src: "WFH/WFH" + Math.floor(Math.random() * 10) + ".jpg"},
    {style: { left: "65%", top: "15%"}, src: "WFL/WFL" + Math.floor(Math.random() * 10) + ".jpg"},
    {style: { left: "75%", top: "65%"}, src: "WMH/WMH" + Math.floor(Math.random() * 10) + ".jpg"},
    {style: { left: "85%", top: "30%"}, src: "WML/WML" + Math.floor(Math.random() * 10) + ".jpg"},
];

const categories = ["BFH", "BFL", "BMH", "BML", "WHF", "WFL", "WMH", "WML"];

export default function Trial() {
    const [ origImg, setOrigImg ] = useState(Math.floor(Math.random() * 8));
    const [ origSrc, setOrigSrc ] = useState(imgStyles[origImg].src);
    const [ blank, setBlank ] = useState(true);
    const [ newImgCat, setNewImgCat ] = useState(categories[Math.floor(Math.random() * 8)]);
    const [ newImg, setNewImg ] = useState(Math.floor(Math.random() * 10));
    const [ spaceKey, setSpaceKey ] = useState(false);
    const [ startTime, setStartTime ] = useState(Date.now());
    const [ payload, setPayload ] = useState({
        changing_before: origSrc,
        changing_after: newImgCat + "/" + newImgCat + newImg + ".jpg",
        changing_x: imgStyles[origImg].style.left.replace("%", ""),
        changing_y: imgStyles[origImg].style.top.replace("%", ""),
        images_used: imgStyles.map((style, key) => { return style.src })
    });

    while (origSrc.includes(categories[newImgCat] + "/" + newImg)) {
        setNewImgCat(categories[Math.floor(Math.random() * 8)]);
        setNewImg(Math.floor(Math.random() * 10));
    }

    useEffect(() => {
        if (spaceKey) {
            setBlank(false);
            return;
        }

        const interval = setInterval(() => {
            setBlank(!blank);
            if (blank) { 
                let temp = newImgCat + "/" + newImgCat + newImg + ".jpg";
                imgStyles[origImg].src === origSrc ? imgStyles[origImg].src = temp : imgStyles[origImg].src = origSrc;
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
            setBlank(false);
        }
    }

    return (blank ? <div></div> : imgStyles.map((img, key) => (
        <Image className = {spaceKey ? "decision" : ""} style = {img.style} src = {img.src} payload = {payload} type={"trial"}/>
    )));
}