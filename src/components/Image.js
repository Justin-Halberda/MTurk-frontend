import React from 'react';
import '../styles/Image.css';

export default function Image(props) {
    const { style, src } = props;
    return (
        <img src={require(`../assests/${src}`)} alt="could not load" className="image" style={style} />
    )
}