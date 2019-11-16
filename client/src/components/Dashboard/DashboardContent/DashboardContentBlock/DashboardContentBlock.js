import React from 'react';
import style from './DashboardContentBlock.module.scss';

function dashboardContentBlock(props) {

    return (
        <div className={style.dashboardContentBlock}
             style={{marginBottom: (props.marginBottom) ? props.marginBottom : "20px"}}>
            <div className={style.dashboardContentBlockTitle}>
                {props.title}
            </div>
            <div className={style.dashboardContentBlockContain}>
                {props.children}
            </div>
        </div>);
}

export default dashboardContentBlock;