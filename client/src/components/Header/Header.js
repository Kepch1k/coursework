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
                    главное меню 1
                </div>
                <div className={`${style.itemOfList}`}>
                    главное меню 2
                </div>
                <div className={`${style.itemOfList}`}>
                    главное меню 3
                </div>
                <div className={`${style.itemOfList}`}>
                    главное меню 4
                </div>
                <div className={`${style.hamburger}`}>
                    <i className="fa fa-bars"/>
                </div>

            </div>
        </div>);
}

export default Header;