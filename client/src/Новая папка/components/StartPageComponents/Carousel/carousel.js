import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import style from './carousel.module.scss';
import "react-multi-carousel/lib/styles.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import MyCarousel from './carouselComponent/carousel';

function carouselElement() {

    const prevIcon = <span className={style.carouselIconPrev}><i className="fas fa-chevron-left"/></span>;
    const nextIcon = <span className={style.carouselIconNext}><i className="fas fa-chevron-right"/></span>;
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };
    return (
        <div className={style.carousel}>
            <div className={style.content}>
                <div className={style.navTabs}>
                    <div className={style.newTabsButton} id={"navTabsSelect"}>
                        Names
                    </div>
                    <div className={style.newTabsButton}>
                        Taglines & Slogans
                    </div>
                    <div className={style.newTabsButton}>
                        Logo Design
                    </div>
                </div>
                {/*}       <Carousel
                       customTransition="all 0.4s cubic-bezier(0,0,1,1) 0s"
                          //customTransition="transform 1000ms cubic-bezier(0,0,1,1)"
                        swipeable={false}
                        draggable={true}
                        centerMode={false}
                        showDots={false}
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 1170 },
                                items: 3,
                                slidesToSlide: 3, // optional, default to 1.

                            },
                            tablet: {
                                breakpoint: { max: 1170, min: 780 },
                                items: 2,
                                slidesToSlide: 2, // optional, default to 1.
                            },
                            mobile: {
                                breakpoint: { max: 780, min: 0 },
                                items: 1,
                                slidesToSlide: 1, // optional, default to 1.
                            }}}
                        infinite={true}
                        focusOnSelect={false}
                        minimumTouchDrag={80}
                        arrows={true}
                       autoPlay
                        customLeftArrow={<span className={style.toLeft} ><i className="fas fa-chevron-left"/></span>}
                        customRightArrow={<span className={style.toRight}><i className="fas fa-chevron-right"/></span>}
                        autoPlaySpeed={5000}
                        itemClass=""
                        containerClass=""
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                    >
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/Banner_Visual_Name_P_42_Avanti.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/Banner_Visual_Name_AL_48_urbanpaces.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/VisualNames_onpoint.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/Banner_Visual_Name_Z_19_AnalytIQ.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/Banner_Visual_Name_AA_48_StyleRevolver.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/Banner_Visual_Name_L_09_lush.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/Banner_Visual_Name_AD_32_Monvelli.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/B_1_01.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/Banner_Visual_Name_N_04_talentera.png)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/39.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/21..jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/Banner_Visual_Name_AN_34_innerworks.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/B_2_15.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/Banner_Visual_Name_Y_29_Vechetti.jpg)"}}/>
                        <div className={style.imgSlide} style={{backgroundImage:"url(https://www.squadhelp.com/story_images/visual_images/07_77.jpg)"}}/>
                    </Carousel>  style={{display:"flex",flexDirection:"row"}}*/}

                <MyCarousel/>
                <div className={style.moreName}>
                    <Link to="/ss">
                        <div className={style.exploreButton}>
                            Explore Names For Sale
                        </div>
                    </Link>
                </div>
            </div>


        </div>


    )
}

export default carouselElement;
