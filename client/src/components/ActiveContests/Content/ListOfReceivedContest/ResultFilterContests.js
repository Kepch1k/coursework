import React from 'react';
import style from './ResultFilterContests.module.scss';
import timeAgo from '../../../../utils/timeAgo';
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

const _ = require("lodash");

let resultFilterContests = props => {

    return (
        <div className={style.resultBody}>
            <div className={style.filters}>
            </div>
            <div className={style.count}>
                {(props.filter.confirmedContests) ? props.filter.confirmedContests.length : 0} Contests
                <div className={style.hrline}/>
            </div>
            <div className={style.content}>

                {(props.filter.confirmedContests) && props.filter.confirmedContests.map((contest, id) => {
                    const duration = timeAgo(contest.createdAt);
                    if (contest.visualBrandStyle) {
                        contest.newVisualBrandStyle = contest.visualBrandStyle.join(", ")
                    } else if (contest.preferenceForName) {
                        contest.newPreferenceForName = contest.preferenceForName.join(", ")
                    } else if (contest.preferenceForTagline) {
                        contest.newPreferenceForTagline = contest.preferenceForTagline.join(", ")
                    }
                    return <div key={id} className={style.contest}>
                        <div className={style.flexRow}>
                            <div className={style.text}>
                                <div className={style.contestTitle}>
                                    <Link to={`/contest/${contest.id}`}>{contest.titleOfContest} #{contest.id}</Link>
                                </div>
                                <div className={style.typeAndTime}>
                                    <Link to=""> <span
                                        className={style.contestType}>{(contest.typeOfContest === "TAGLINE_OR_SLOGAN") ? "Branding & identity" : "Naming"} / {contest.typeOfContest.replace(/_/g, ' ')}</span></Link>
                                    <span
                                        className={style.timeAgo}>{" "}(Saved {(duration.humanize({precision: 4}).indexOf('ago') !== -1) ? duration.humanize({precision: 4}) : duration.humanize({precision: 4}) + "  ago"})</span>
                                </div>

                                <div className={style.preferences}>
                                    <div>preferences
                                        : {contest.newVisualBrandStyle || contest.newPreferenceForName || contest.newPreferenceForTagline}   </div>
                                    <div> target customers : {contest.targetCustomers}   </div>
                                </div>
                                <div className={style.rating}>
                                    <i className="far fa-star"/>
                                    <i className="far fa-star"/>
                                    <i className="far fa-star"/>
                                    <i className="far fa-star"/>
                                    <i className="far fa-star"/>&nbsp;&nbsp;&nbsp;
                                    Guaranteed prize &nbsp;&nbsp;
                                    <i className={`fas fa-check-circle ${style.prize}`}/> &nbsp;&nbsp;${contest.price}
                                </div>
                            </div>
                            <div className={style.entries}>
                                <div><i className="fas fa-users"/> {contest['numberOfEntries']}</div>
                                <span>Entries</span>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        filter: state.ActiveContestFilterReducer
    };
};


export default connect(mapStateToProps)(resultFilterContests);
