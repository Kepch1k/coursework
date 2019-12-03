import React, {useState} from 'react';
import style from './BarMenu.module.scss';
import ListElement from '../../../../constants/BarMenuLists';
import {Link} from 'react-router-dom';

function BottomHeaderList(props) {
    const [viewStatus, setViewStatus] = useState({
        "Active Contests": false,
        "Marketplace": false,
        "Examples": false,
        "Winners": false,
        "help": false,
    });

    function onClickedBarMenu(name) {
        if (viewStatus.hasOwnProperty(name)) {
            setViewStatus(
                {
                    ...viewStatus,
                    [name]: !viewStatus[name]
                }
            );
        }

    }

    const RESULT = [];
    for (let key in ListElement) {
        let LIST = [];
        if (ListElement.hasOwnProperty(key)) {
            const LIST_NAME = ListElement[key].name;
            const LIST_LINK = ListElement[key].link;
            if (ListElement[key].list) {
                const SUB_LIST = ListElement[key].list.map((item, id) => {
                    const link = item.link;
                    const name = item.name;
                    return <Link key={id} to={link}>
                        <li>{name}</li>
                    </Link>;
                });
                LIST.push(SUB_LIST)
            }
            RESULT.push(<li className={style.barMenuListItems}
                            style={{cursor: (ListElement[key].list) ? "pointer" : "normal"}}
                            key={LIST_NAME}>
                <ul className={style.barMenuSubList}>
                    <div><Link to={LIST_LINK}>{LIST_NAME}</Link>
                        {(ListElement[key].list) ? <span onClick={() => onClickedBarMenu(LIST_NAME)}> <i
                            className={(viewStatus[LIST_NAME]) ? "fa fa-angle-down  fa-flip-vertical" : "fa fa-angle-down"}/></span> : <></>}
                    </div>
                    {(viewStatus[LIST_NAME]) && <div className={style.SubBlock}>{LIST}</div>}
                </ul>
            </li>)
        }


    }
    return (
        <ul className={style.mainHeaderBottomLists}
            style={{maxHeight: props.height, borderBottom: props.border, borderTop: props.borderTop}}>
            {RESULT}
        </ul>
    );
}

export default BottomHeaderList;