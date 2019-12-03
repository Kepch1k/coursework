import React, {useEffect} from 'react';
import style from './CreateContest.module.scss';
import Header from '../../components/commonToAll/Header/Header';
import HeaderBottom from '../../components/commonToAll/HeaderBottom/HeaderBottom';
import HeaderCreateContest from '../../components/CreatContestComponents/Header/Header';
import Footer from '../../components/commonToAll/Footer/footer';
import Form from '../../components/CreatContestComponents/threeStepContestForm/threeStepContestForm'
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router';
import {newMessageToUser} from "../../actions/actionCreator";

function CreateContest(props) {
    useEffect(() => {
        if ((props.user.role !== "Buyer")) {
            props.newMessageToUser({msg: "Sorry but you are Creative. You cannot create a Contest", error: true})
        }
    });
    return (
        <div className={style.body}>
            {(props.stage === 1) ? <Redirect to="/contest_creating_choose_type"/> : <></>}
            {(props.user.role !== "Buyer") ? <Redirect to="/contest_creating_choose_type"/> : <></>}
            <Header/>
            <HeaderBottom/>
            <HeaderCreateContest/>
            <Form local={props.local}/>
            <Footer/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state,
        user: state.userReducers.user,
        stage: state.contestReducers.contestStage,
        selectedContestTypes: state.contestReducers.selectedContestTypes
    };
};
const mapDispatchToProps = (dispatch) => ({
    newMessageToUser: (data) => dispatch(newMessageToUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateContest);

