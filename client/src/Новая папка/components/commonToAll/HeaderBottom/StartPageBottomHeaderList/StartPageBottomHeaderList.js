import React from 'react';
import style from './StartPageBottomHeaderList.module.scss';
import ListElement from '../../../../constants/StartPageBottomHeaderLists';
import {LIST_NAMES} from '../../../../constants/consts';
import {Link} from 'react-router-dom';

function BottomHeaderList(props) {
    let number = 0;
    const RESULT = [];
    for (let key in ListElement) {
        if (ListElement.hasOwnProperty(key)) {
            const SUB_LIST = ListElement[key].map((item, id) => {
                const text = item.text;
                const link = item.link;
                return (item.text === "Line") ? <span key={text + (id)} className={style.lineLi}/> :
                    <Link key={text} to={link}>
                        <li>{text}</li>
                    </Link>;
            });
            if (LIST_NAMES[number] === "BLOG") {
                RESULT.push(<li key={number} className={style.mainHeaderBottomFlexListsBlog}>
                    <div className={style.SublistTitle}> {LIST_NAMES[number]} <i className="fa fa-angle-down"/></div>
                    <ul className={style.mainHeaderBottomSubListsBlog}>
                        {SUB_LIST}
                    </ul>
                </li>)
            } else {
                RESULT.push(
                    <li key={number} className={style.mainHeaderBottomFlexLists}>
                        <div className={style.SublistTitle}> {LIST_NAMES[number]} <i className="fa fa-angle-down"/>
                        </div>
                        <ul className={style.mainHeaderBottomSubLists}>
                            {SUB_LIST}
                        </ul>
                    </li>);
            }
            number++
        }

    }
    return (
        <ul className={style.mainHeaderBottomLists}>
            {RESULT}
        </ul>
    );
}

export default BottomHeaderList;