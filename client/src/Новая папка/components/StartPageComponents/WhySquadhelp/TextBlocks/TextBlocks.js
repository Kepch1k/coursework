import React from 'react';

import style from './TextBlocks.module.scss';

import "react-multi-carousel/lib/styles.css";

import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import {Link} from "react-router-dom";


function TextBlocks(props) {


    return (
        <div className={style.mainTextBlocks}>
            <div className={style.mainTextBlocksInside}>
                <div className={style.image} style={{backgroundImage: "url(" + props.img + ")"}}>

                </div>
                <div className={style.title}>
                    {props.title}
                </div>
                <div className={style.text}>
                    {props.text1}
                    <Link to={props.link}>{props.linkText}</Link>
                    {props.text2}
                </div>
            </div>
        </div>


    )
}

export default TextBlocks;
