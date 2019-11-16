import React, {useEffect, useState} from 'react';
import style from './carousel.module.scss';
import {FIRST_CAROUSEL} from '../../../../constants/contestImgs';

function carouselElement() {
    let timeout = 0;
    let maxLeft = 5670;
    const functionInterval = () => {
        timeout = setInterval(() => {
            if (window.innerWidth <= 756) {
                setCountPictureForSlide(1);
            } else if (window.innerWidth <= 1134) {
                setCountPictureForSlide(2);
            } else if (window.innerWidth > 1134) {
                setCountPictureForSlide(3);
            }
            if (maxLeft + (left - 378 * countPictureForSlide) > 0) {
                setLeft(left - 378 * countPictureForSlide)
            } else {
                setLeft(maxLeft + (left - 378 * countPictureForSlide))
            }
        }, 2000);
    };
    const [left, setLeft] = useState(0);
    const [countPictureForSlide, setCountPictureForSlide] = useState((window.innerWidth / 378 > 3) ? 3 : Math.floor(window.innerWidth / 378));


    useEffect(() => {
        functionInterval();
        return () => clearInterval(timeout);
    });


    const nextSlide = () => {
        setCountPictureForSlide((window.innerWidth / 378 > 3) ? 3 : Math.floor(window.innerWidth / 378));
        setLeft(left - 378 * countPictureForSlide);
    };
    const prevSlide = () => {
        setCountPictureForSlide((window.innerWidth / 378 > 3) ? 3 : Math.floor(window.innerWidth / 378));
        setLeft(left + 378 * countPictureForSlide);
    };

    const slides = FIRST_CAROUSEL.map((element) => {
        return <div key={element} className={style.carouselItem} onMouseOver={() => clearInterval(timeout)}
                    onMouseOut={() => functionInterval()}
                    style={{backgroundImage: "url(" + element + ")"}}/>
    });

    return (

        <div className={style.carouselBody}>
            <div className={style.icon} onClick={prevSlide}>
                <i className="fas fa-chevron-left"/>
            </div>
            <div className={style.carouselInner} id={'Inner'}>
                <div className={style.carouselSlider} id={'Slider'} style={{left: left + "px"}}>
                    {slides}
                </div>
            </div>
            <div className={style.icon} onClick={nextSlide}>
                < i className="fas fa-chevron-right"/>
            </div>
        </div>

    )
}

export default carouselElement;