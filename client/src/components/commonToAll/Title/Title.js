import React from 'react';
import style from './Title.module.scss';

function Title(props) {
    return (
        <div className={style.titleHeading} style={{color: props.color}}>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
            <hr style={{border: "1px solid" + props.borderColor}}/>
        </div>
    )
}

export default Title;
