import React, { useState, useEffect } from 'react'
import Image from '../components/Image'
import { useNavigate } from "react-router-dom";
import store from '../utils/store';

let imgStyles = [
    {style: { left:"5%", top: "7%", display: "block", writable: true}, src: "BFH/BFH" + (Math.floor(Math.random() * 10) + 1) + ".jpg"},
    {style: { left: "10%", top: "60%", display: "block"}, src: "BFL/BFL" + (Math.floor(Math.random() * 10) + 1) + ".jpg"},
    {style: { left: "30%", top: "20%", display: "block"}, src: "BMH/BMH" + (Math.floor(Math.random() * 10) + 1) + ".jpg"},
    {style: { left: "35%", top: "75%", display: "block"}, src: "BML/BML" + (Math.floor(Math.random() * 10) + 1) + ".jpg"},
    {style: { left: "53%", top: "50%", display: "block"}, src: "WFH/WFH" + (Math.floor(Math.random() * 10) + 1) + ".jpg"},
    {style: { left: "65%", top: "15%", display: "block"}, src: "WFL/WFL" + (Math.floor(Math.random() * 10) + 1) + ".jpg"},
    {style: { left: "75%", top: "65%", display: "block"}, src: "WMH/WMH" + (Math.floor(Math.random() * 10) + 1) + ".jpg"},
    {style: { left: "85%", top: "30%", display: "block"}, src: "WML/WML" + (Math.floor(Math.random() * 10) + 1) + ".jpg"},
];

const categories = ["BFH", "BFL", "BMH", "BML", "WFH", "WFL", "WMH", "WML"];

export default function Trial() {
    const [ origImg, setOrigImg ] = useState(Math.floor(Math.random() * 8));
    const [ origSrc, setOrigSrc ] = useState(imgStyles[origImg].src);
    const [ blank, setBlank ] = useState(true);
    const [ newImgCat, setNewImgCat ] = useState(categories[Math.floor(Math.random() * 8)]);
    const [ newImg, setNewImg ] = useState((Math.floor(Math.random() * 10) + 1));
    const [ spaceKey, setSpaceKey ] = useState(false);
    const [ startTime, setStartTime ] = useState(Date.now());
    const [ payload, setPayload ] = useState({
        changing_before: origSrc,
        changing_after: newImgCat + "/" + newImgCat + newImg + ".jpg",
        changing_x: imgStyles[origImg].style.left.replace("%", ""),
        changing_y: imgStyles[origImg].style.top.replace("%", ""),
        images_used: imgStyles.map((style, key) => { return style.src })
    });

    imgStyles.push({style: Object.assign({}, imgStyles[origImg].style, { display: "none" }), src: newImgCat + "/" + newImgCat + newImg + ".jpg"});

    while (origSrc.includes(categories[newImgCat] + "/" + newImg)) {
        setNewImgCat(categories[Math.floor(Math.random() * 8)]);
        setNewImg((Math.floor(Math.random() * 10) + 1));
        setPayload({
            ...payload,
            changing_after: newImgCat + "/" + newImgCat + newImg + ".jpg",
        });
        imgStyles[8].style = Object.assign({}, imgStyles[origImg].style, { display: "none" });
        imgStyles[8].src = newImgCat + "/" + newImgCat + newImg + ".jpg";
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
                if (imgStyles[8].style.display === "none") {
                    imgStyles[8].style = Object.assign({}, imgStyles[8].style, { display: "block" });
                    imgStyles[origImg].style = Object.assign({}, imgStyles[origImg].style, { display: "none" });
                } else {
                    imgStyles[8].style = Object.assign({}, imgStyles[8].style, { display: "none" });
                    imgStyles[origImg].style = Object.assign({}, imgStyles[origImg].style, { display: "block" });
                }
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

    return (
        <div style={blank ? {display: "none"} : {}}>
            {imgStyles.map((img, key) => (
                <Image spaceKey = {spaceKey} style = {img.style} src = {img.src} payload = {payload} type={"trial"}/>
            ))}
        </div> 
    );
}