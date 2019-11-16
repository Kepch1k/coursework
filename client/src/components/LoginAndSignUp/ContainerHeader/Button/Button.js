import React from 'react';
import style from './Button.module.scss';
import {Link} from 'react-router-dom';

function Main(props) {

    return (
        <Link className={style.anchor} to={props.link}>
            <div className={style.button}/>
            {props.text}</Link>
    );
}

export default Main;
