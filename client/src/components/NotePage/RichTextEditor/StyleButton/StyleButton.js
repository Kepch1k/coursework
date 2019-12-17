import React from 'react';
import style from './RichTextEditor.module.scss';

const StyleButton = (props) => {
    function onToggle(e){
        e.preventDefault();
        props.onToggle(props.style);
    }

    let className = style['RichEditor-styleButton'];
    if (props.active) {
        className += ` ${style['RichEditor-activeButton']}`;
    }

    return (
        <span className={` ${className} `} onMouseDown={onToggle}>
              {props.label}
            </span>
    );
};

export default StyleButton;