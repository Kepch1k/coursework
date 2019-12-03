import React from 'react';
import style from './CardCategories.module.scss';
import {Link} from 'react-router-dom';

function CardCategories(props) {
    const {contestType} = props;
    const func = (props.click || props.alsoClick) ? () => {
        props.click(props.contestType);
        props.alsoClick(props.currentStage, (contestType) ? contestType[0] : null
        );
        window.scrollTo(0, 0);

    } : () => {
    };
    const IMAGES = (props.img).map((item) => {
        return <div key={item} className={style.image} style={{backgroundImage: item}}/>
    });
    return (

        <div className={style.preCardCategories}>
            <Link to="/contest_creating/" className={style.cardCategories} style={{backgroundColor: props.styles}}
                  onClick={func}>
                <div className={style.flexImg}>
                    {IMAGES}
                </div>
                <h5>{props.name}</h5>
                <hr/>
                <p>{props.text}</p>
            </Link>
        </div>

    );
}

export default CardCategories;
