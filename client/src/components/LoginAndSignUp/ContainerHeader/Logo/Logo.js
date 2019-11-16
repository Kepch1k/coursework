import React from 'react';
import style from './Logo.module.scss';
import {Link} from "react-router-dom";

function Main() {
    return (
        <Link to="/">
            <div className={style.main}/>
        </Link>
    );
}

export default Main;
