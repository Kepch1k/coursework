import React,{useState} from 'react';
import style from './Tag.module.scss';

function Tag(props) {
    return (
        <div className={`${style.tag}`}>
            #{props.value} <i onClick={props.onClicked} className="fas fa-times"/>
        </div>);
}

export default Tag;