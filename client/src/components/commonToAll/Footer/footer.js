import React from 'react';
import style from './footer.module.scss';
import {Link} from 'react-router-dom';
import {hoizontLine, listFirst, listSecond} from '../../../constants/footerContent';

const listsToRenderFirstLine = (lists) => {
    return lists.map((item, id) => {
        if (item.hasOwnProperty('upper')) {
            let columnLists = [];
            for (let key in item) {
                if (item.hasOwnProperty(key)) {
                    columnLists.push(<div className={style.listFooterDouble} key={[key] + id}>
                        <div className={style.listTitle}>{item[key].title}</div>
                        <div className={style.listElements}>
                            {item[key].elements.map((element, ident) => {
                                return <Link key={ident} to={element.link}>
                                    <div className={style.listElement}>
                                        {element.text}
                                    </div>
                                </Link>
                            })}
                        </div>
                    </div>)
                }
            }
            return <div className={style.flexDataColumn} key={id + 'double'}>
                {columnLists}
            </div>
        } else {
            return <div className={style.listFooterFirstLine} key={id}>
                <div className={style.listTitle}>{item.title}</div>
                <div className={style.listElements}>
                    {item.elements.map((element, ident) => {
                        return <Link key={ident} to={element.link}>
                            <div className={style.listElement}>
                                {element.text}
                            </div>
                        </Link>
                    })}
                </div>
            </div>
        }

    })
};

const listsToRenderSecondLine = (lists) => {
    return lists.map((item, id) => {
        return <div className={style.listFooter} key={id}>
            <div className={style.listElements}>
                {item.elements.map((element, ident) => {
                    return <Link key={ident} to={element.link}>
                        <div className={style.listElement}>
                            {element.text}
                        </div>
                    </Link>
                })}
            </div>
        </div>
    })
};

const footer = () => {
    const listOneToRender = listsToRenderFirstLine(listFirst);
    const listSecondToRender = listsToRenderSecondLine(listSecond);
    return (
        <div className={style.mainFooter}>
            <div className={style.longFooter}>
                <div className={style.container}>
                    <div className={`${style.firstList}`}>

                        {listOneToRender}

                    </div>
                    <div className={style.horizontLine}>{hoizontLine.title}</div>
                    <div className={style.flexData}>
                        {listSecondToRender}
                    </div>
                    <Link to="https://www.shopperapproved.com/reviews/squadhelp.com/">
                        <div className={style.raiting}>Squadhelp.com has a Shopper Approved rating of 4.9/5 based on
                            2472 ratings and reviews
                        </div>
                    </Link>
                </div>
            </div>
            <div className={style.footer}>

                <div className={style.container}>

                    <div className={style.flexData}>

                        <div className={style.flexDataLogoAndIcon}>
                            <div className={style.whiteLogo}/>
                            <div className={style.copyright}>
                                Copyright © 2018 Squadhelp Inc
                            </div>
                        </div>


                        <div className={style.flexDataIcon}>
                            <div className={style.round}>
                                <div className={style.inside}>
                                    <i className="fab fa-facebook-f"/>
                                </div>
                            </div>
                            <div className={style.round}>
                                <div className={`${style.inside} ${style.googleIcon}`}>
                                    <i className="fab fa-google-plus"/>
                                </div>
                            </div>
                            <div className={style.round}>
                                <div className={style.inside}>
                                    <i className="fab fa-twitter" aria-hidden="true"/>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

            </div>

        </div>
    );
};

export default footer;
