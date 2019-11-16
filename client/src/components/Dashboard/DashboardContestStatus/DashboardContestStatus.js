import React, {useEffect} from 'react';
import style from './DashboardContestStatus.module.scss';
import StatusBlock from './DashboardContestStatusBlock/StatusBlock';
import connect from "react-redux/es/connect/connect";
import {
    changeAppStatus,
    contestProgressing,
    createOrUpdateTempContest,
    getUserContests,
    selectedContestType
} from "../../../actions/actionCreator";


function dashboardContestStatus(props) {

    useEffect(() => {

        if (props.user && !props.userContests.contests) {
            props.getUserContests(props.user.id)
        }
        if (props.user && props.app.needUpdate['userContests']) {
            props.getUserContests(props.user.id);
            props.changeAppStatus({'userContests': false});
        }


    });
    return (
        <div className={style.displayBlockRow}>
            <StatusBlock imgColor={"#16a085"} imgIcon={<i className="fas fa-pen-square"/>}
                         count={props.userContests.numberInDraft}
                         text={"Contests in Draft"} linkText={"Continue Editing"} link={"/contest_creating/"}
                         click={true}
                         userContest={(props.userContests.latestContestInDraft) ? props.userContests : null}/>
            <StatusBlock imgColor={"#8e44ad"} imgIcon={<i className="far fa-lightbulb"/>}
                         count={props.userContests.numberInLaunch}
                         text={"Launched Contests"} linkText={"Launch Contest"} link={"/contest_creating_choose_type"}/>
        </div>);
}


const mapStateToProps = (state) => {
    return {
        state,
        user: state.userReducers.user,
        userContests: state.userContestsReducers,
        app: state.AppReducers,
    }
};
const mapDispatchToProps = (dispatch) => ({
    getUserContests: (data) => dispatch(getUserContests(data)),
    changeAppStatus: (value) => dispatch(changeAppStatus(value)),
    selectedContestType: (contestTypes) => dispatch(selectedContestType(contestTypes)),
    contestProgressing: (currentStage, type) => dispatch(contestProgressing(currentStage, type)),
    createOrUpdateTempContest: (currentStage, type) => dispatch(createOrUpdateTempContest(currentStage, type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(dashboardContestStatus);
