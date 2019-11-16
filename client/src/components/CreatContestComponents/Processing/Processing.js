import React from 'react';
import style from './Processing.module.scss';
import {TEXT_PROGRESSING} from '../../../constants/consts';

function Processing(props) {
    const array = [];
    for (let i = 1; i <= props.number; i++) {
        if (i === props.stage) {
            if (i === props.number) {
                array.push(
                    <React.Fragment key={i}>
                        <div className={style.circleDone}>
                            <div className={style.label}/>
                            <div className={style.preTitle}>
                                <div className={style.title}>
                                    {TEXT_PROGRESSING[props.text]}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            } else {
                array.push(
                    <React.Fragment key={i}>
                        <div className={style.circleDone}>
                            <div className={style.label}/>
                            <div className={style.preTitle}>
                                <div className={style.title}>
                                    {TEXT_PROGRESSING[props.text]}
                                </div>
                            </div>
                        </div>
                        <div className={style.tube}/>
                    </React.Fragment>
                )
            }
        } else if (i === props.number) {
            array.push(
                <React.Fragment key={i}>
                    <div className={style.circle}/>
                </React.Fragment>
            )
        } else if (i < props.stage) {
            array.push(
                <React.Fragment key={i}>
                    <div className={style.circleComplete}>
                        <div className={style.label}><i className="fa fa-check"/></div>
                    </div>
                    <div className={style.tube}/>
                </React.Fragment>
            )
        } else if (i > props.stage) {
            array.push(
                <React.Fragment key={i}>
                    <div className={style.circle}/>
                    <div className={style.tube}/>
                </React.Fragment>
            )
        }
    }

    return (
        <div className={style.preProgressMain} key={TEXT_PROGRESSING['start']}>
            <div className={style.progressMain}>
                <div className={style.content}>
                    <div className={style.tubeFirst}/>
                    {array}
                    <div className={style.tubeFirst}/>
                </div>
            </div>
        </div>
    );
}

export default Processing;
