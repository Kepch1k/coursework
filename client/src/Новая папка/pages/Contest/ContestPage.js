import React, {useEffect} from 'react';
import Header from "../../components/commonToAll/Header/Header";
import Footer from '../../components/commonToAll/Footer/footer';
import HeaderBottom from "../../components/commonToAll/HeaderBottom/HeaderBottom";
import Contest from "../../components/Contest/Contest";
import connect from "react-redux/es/connect/connect";
import {getContestById} from "../../actions/actionCreator";

function contest(props) {
    useEffect(() => {
        if (props.user) {
            props.getContestById(props.id);
        }

    });
    return (
        <div>
            <Header/>
            <HeaderBottom/>
            <Contest/>
            <Footer/>
        </div>);
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
    filter: state.ActiveContestFilterReducer
});

const mapDispatchToProps = (dispatch) => ({
    getContestById: (id) => dispatch(getContestById(id)),

});


export default connect(mapStateToProps, mapDispatchToProps)(contest);