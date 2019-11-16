import React from 'react';
import style from './Phone.module.scss';
import {Link} from 'react-router-dom';

function Phone() {
    return (
        <div className={style.main}>
            <div className={style.mainContactDetails}>
                <i className="fa fa-flip-horizontal fa-phone"/>
                &nbsp;
                <Link to="/sssss" className={style.anchorPhone}>(877)&nbsp;355-3585</Link>
            </div>
        </div>
    );
}

export default Phone;


