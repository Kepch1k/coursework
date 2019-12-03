import React from 'react';
import style from './StatusBlock.module.scss';
import {Link} from "react-router-dom";
import {contestProgressing, createOrUpdateTempContest, selectedContestType} from "../../../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";

function statusBlock(props) {
    return (
        <div className={style.statusBlock}>
            <div className={style.intermediateLayer}>
                <div className={style.statusBlockImg} style={{backgroundColor: props.imgColor}}>
                    <div>{props.imgIcon}</div>
                </div>
                <div className={style.statusBlockColumn}>

                    <div className={style.statusBlockCount}>
                        {props.count}
                    </div>
                    <div className={style.statusBlockText}>
                        {props.text}
                    </div>
                    <div className={style.statusBlockLink}>
                        <Link to={props.link} className={style.anchorPhone}
                              onClick={(props.userContest && props.click) ? () => {
                                  props.selectedContestType([props.userContest.latestContestInDraft.typeOfContest]);
                                  props.contestProgressing(2, props.userContest.latestContestInDraft.typeOfContest);
                                  props.createOrUpdateTempContest(props.userContest.latestContestInDraft)
                              } : () => {
                              }}>{props.linkText}</Link>
                    </div>
                </div>
            </div>
        </div>);
}

const mapDispatchToProps = (dispatch) => ({
    selectedContestType: (contestTypes) => dispatch(selectedContestType(contestTypes)),
    contestProgressing: (currentStage, type) => dispatch(contestProgressing(currentStage, type)),
    createOrUpdateTempContest: (currentStage, type) => dispatch(createOrUpdateTempContest(currentStage, type)),
});
export default connect(null, mapDispatchToProps)(statusBlock);