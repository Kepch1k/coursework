import React from 'react';
import style from './DashboardContent.module.scss';
import {Link} from "react-router-dom";
import {
    contestProgressing,
    createOrUpdateTempContest,
    deleteContest,
    selectedContestType
} from "../../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import timeAgo from '../../../utils/timeAgo'

const _ = require("lodash");

function contestBlock(props) {
    const createdAt = _.cloneDeep(props.contest.createdAt);
    const duration = timeAgo(createdAt);
    const cloneContest = _.cloneDeep(props.contest);
    if (cloneContest.visualBrandStyle) {
        cloneContest.newVisualBrandStyle = cloneContest.visualBrandStyle.join(", ")
    } else if (cloneContest.preferenceForName) {
        cloneContest.newPreferenceForName = cloneContest.preferenceForName.join(", ")
    } else if (cloneContest.preferenceForTagline) {
        cloneContest.newPreferenceForTagline = cloneContest.preferenceForTagline.join(", ")
    }
    return (<div className={style.contestInDraft}>
            <div className={style.contestInDraftContainer}>
                <div className={style.contestInDraftContainerInside}>
                    <div className={style.contestInDraftContainerColumn}>
                        <div className={style.contestInDraftContainerRow}>
                            <div className={style.contestInDraftContainerRowInsideColumn}>
                                <div className={style.firstRow}>
                                    <Link
                                        to={`/contest/${cloneContest.id}`}> #{cloneContest.id} - {cloneContest.titleOfContest}</Link>
                                </div>
                                <div className={style.secondRow}>
                                    <Link
                                        to=""> {(cloneContest.typeOfContest === "TAGLINE_OR_SLOGAN") ? "Branding & identity" : "Naming"} / {cloneContest.typeOfContest.replace(/_/g, ' ')}</Link>
                                    {" "}(Saved {(duration.humanize({precision: 4}).indexOf('ago') !== -1) ? duration.humanize({precision: 4}) : duration.humanize({precision: 4}) + "  ago"})
                                </div>
                            </div>
                            <div className={style.buttonPosition}>
                                {(cloneContest['status'] === 'Not Paid') &&
                                <Link to="/contest_creating/" onClick={() => {
                                    props.selectedContestType([cloneContest.typeOfContest]);
                                    props.contestProgressing(2, cloneContest.typeOfContest);
                                    props.createOrUpdateTempContest(cloneContest)
                                }}>
                                    <div className={style.button}>
                                        <i className="fas fa-pen-square"/> Continue Editing
                                    </div>
                                </Link>}</div>
                        </div>
                        <div className={style.contestInDraftContainerRow}>
                            <div className={style.contestInDraftContainerRowInsideColumn}>
                                <div className={style.thirdRow}>
                                    preferences
                                    : {cloneContest.newVisualBrandStyle || cloneContest.newPreferenceForName || cloneContest.newPreferenceForTagline}
                                </div>
                                <div className={style.fourthRow}>
                                    target customers : {cloneContest.targetCustomers}
                                </div>
                            </div>
                            <div>
                                {}
                            </div>
                        </div>
                        <div className={style.contestInDraftContainerRow}>
                            <div className={style.fifthRow}>
                                <div>
                                    <i className="far fa-star"/>
                                    <i className="far fa-star"/>
                                    <i className="far fa-star"/>
                                    <i className="far fa-star"/>
                                    <i className="far fa-star"/>&nbsp;&nbsp; {props.nickName}   &nbsp;&nbsp;&nbsp; <i
                                    className="far fa-gem"/> ${(cloneContest['status'] === 'Not Paid') ? 0 : cloneContest.price}
                                </div>
                            </div>
                            <div className={style.sixthRow}>
                                {(cloneContest['status'] === 'Not Paid') &&
                                <i onClick={() => props.deleteContest(cloneContest.id, props.user.id)}
                                   className={"fas fa-trash-alt " + `${style.trash}`}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state,
        user: state.userReducers.user,
    };
};
const mapDispatchToProps = (dispatch) => ({
    selectedContestType: (contestTypes) => dispatch(selectedContestType(contestTypes)),
    contestProgressing: (currentStage, type) => dispatch(contestProgressing(currentStage, type)),
    createOrUpdateTempContest: (currentStage, type) => dispatch(createOrUpdateTempContest(currentStage, type)),
    deleteContest: (idContest, idUser) => dispatch(deleteContest(idContest, idUser)),

});
export default connect(mapStateToProps, mapDispatchToProps)(contestBlock);