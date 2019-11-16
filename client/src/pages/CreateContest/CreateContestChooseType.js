import React, {useEffect} from 'react';
import style from './CreateContest.module.scss';
import Header from '../../components/commonToAll/Header/Header';
import Footer from '../../components/commonToAll/Footer/footer';
import HeaderBottom from '../../components/commonToAll/HeaderBottom/HeaderBottom';
import HeaderCreateContest from '../../components/CreatContestComponents/Header/Header';
import ContestCategories from '../../components/CreatContestComponents/contestCategories/contestCategories';
import PackagesAndOther from '../../components/CreatContestComponents/PackagesAndOther/PackagesAndOther';
import connect from "react-redux/es/connect/connect";
import {startValueContestProgressing} from "../../constants/consts";
import {contestProgressing, resetTempContests, selectedContestType} from "../../actions/actionCreator";

const _ = require("lodash");

function CreateContest(props) {
    if (props.stage !== 1) {
        props.contestProgressing(startValueContestProgressing, null);
        props.selectedContestType([]);


    }
    useEffect(() => {
        if (!_.isEmpty(props.tempContests)) {
            props.resetTempContests();
        }
    });
    return (
        <div className={style.body}>
            <Header/>
            <HeaderBottom/>
            <HeaderCreateContest/>
            <ContestCategories/>
            <PackagesAndOther/>
            <Footer/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state,
        stage: state.contestReducers.contestStage,
        selectedContestTypes: state.contestReducers.selectedContestTypes,
        tempContests: state.contestReducers.tempContests,
    };
};
const mapDispatchToProps = (dispatch) => ({
    selectedContestType: (contestTypes) => dispatch(selectedContestType(contestTypes)),
    contestProgressing: (firstValue, secondValue) => dispatch(contestProgressing(firstValue, secondValue)),
    resetTempContests: () => dispatch(resetTempContests()),

});
export default connect(mapStateToProps, mapDispatchToProps)(CreateContest);