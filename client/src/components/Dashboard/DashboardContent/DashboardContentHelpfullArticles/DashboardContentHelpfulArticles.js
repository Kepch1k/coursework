import React from 'react';
import style from './DashboardContentHelpfulArticles.module.scss';


function dashboardContentHelpfulArticles(props) {
    return (
        <div className={style.HelpfulArticlesRow}>
            <div className={style.HelpfulArticlesCheck}>
                <i className="fa fa-check"/>
            </div>
            <div className={style.HelpfulArticlesLink}>
                {props.children}
            </div>
        </div>);
}

export default dashboardContentHelpfulArticles;