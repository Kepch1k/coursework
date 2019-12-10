import React from 'react';
import style from './Footer.module.scss';

function Footer(props) {
    return (
        <div className={`${style.footer}`} id={"footer"}>
            <div className={`${style.social}`}>
                <div className={`${style.item}`}>
                    <i className={`${style.facebook} fab fa-facebook`}/>
                </div>
                <div className={`${style.item}`}>
                    <i className={`${style.twitter} fab fa-twitter`}/>
                </div>
                <div className={`${style.item}`}>
                    <i className={`${style.google} fab fa-google-plus`}/>
                </div>
                <div className={`${style.item}`}>
                    <i className={`${style.instagram} fab fa-instagram`}/>
                </div>
            </div>
            <div className={`${style.copyright}`} >
                © 2019 Copyright
            </div>



        </div>);
}

export default Footer;