import React from 'react';
import style from './Header.module.scss';

function Header(props) {
    return (
        <div className={`${style.header}`} id={"header"}>
            <div className={`${style.logo}`}>
                <i className="fas fa-home"/>
            </div>
            <div className={`${style.list}`}>
                <div className={`${style.itemOfList}`}>
                    пункт 1
                </div>
                <div className={`${style.itemOfList}`}>
                    пункт 2
                </div>
                <div className={`${style.hamburger}`}>
                    <i className="fa fa-bars"/>
                </div>

            </div>
        </div>);
}

export default Header;