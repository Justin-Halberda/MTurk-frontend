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
    const [ imgSrc, setImgSrc ] = useState(newImgCat + "/" + newImgCat + "/" + newImg + ".jpg");
    const [ spaceKey, setSpaceKey ] = useState(false);
    const [ startTime, setStartTime ] = useState(Date.now());
    const [ payload, setPayload ] = useState({
        changing_before: origSrc,
        changing_after: imgSrc,
        changing_x: imgStyles[origImg].style.left.replace("%", ""),
        changing_y: imgStyles[origImg].style.top.replace("%", ""),
        images_used: imgStyles.map((style, key) => { return style.src })
    });

    while (origSrc.includes(imgSrc)) {
        setNewImgCat(categories[Math.floor(Math.random() * 8)]);
        setNewImg(Math.floor(Math.random() * 10));
        setImgSrc(newImgCat + "/" + newImgCat + "/" + newImg + ".jpg");
    }

    useEffect(() => {
        if (spaceKey) {
            setBlank(false);
            return;
        }

        const interval = setInterval(() => {
            setBlank(!blank);
            if (blank) { 
                let temp = imgStyles[origImg].src;
                imgStyles[origImg].src = imgSrc;
                setImgSrc(temp);
            }

        }, 1000);
        return () => clearInterval(interval);
    }, [blank]);

    document.body.onkeyup = (e) => {
        if (e.key === " " || e.code === "Space") {
            const endTime = Date.now();
            const duration = endTime - startTime;
            setSpaceKey(true);
            setBlank(false);
        }
    }

    return (blank ? <div></div> : imgStyles.map((img, key) => (
        <Image className = {spaceKey ? "decision" : ""} style = {img.style} src = {img.src} payload = {payload} type={"trial"}/>
    )));
}