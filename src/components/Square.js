import React from 'react';
import '../styles/Square.css';

export default function Square(props) {
    const { style } = props;
    return (
        <div className="square" style={style}/>
    )
}