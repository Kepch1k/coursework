import React from 'react';
import style from './notFound.module.scss';
import {Link} from 'react-router-dom';


function notFound() {
    return (
        <div className={style.body}>
            <div className={style.notFound}/>
            <div>
                <Link className={style.mainAnchor} to="/">
                    <div className={style.mainLogo}/>
                </Link>
            </div>
        </div>
    );
}

export default notFound;

