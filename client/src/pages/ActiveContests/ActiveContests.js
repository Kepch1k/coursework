import React, {useEffect} from 'react';
import Header from "../../components/commonToAll/Header/Header";
import Footer from '../../components/commonToAll/Footer/footer';
import HeaderBottom from "../../components/commonToAll/HeaderBottom/HeaderBottom";
import ActiveContestContent from "../../components/ActiveContests/Content/ActiveContestContent";
import connect from "react-redux/es/connect/connect";
import {getContestByFilter} from "../../actions/actionCreator";

function activeContests(props) {
    useEffect(() => {
        if ((props.filter.confirmedContests === null) && (props.filter.isFetching === false)) {
            props.getContestByFilter();
        }
    });
    return (
        <div>
            <Header/>
            <HeaderBottom/>
            <ActiveContestContent/>
            <Footer/>
        </div>);
}

const mapStateToProps = (state) => ({
    filter: state.ActiveContestFilterReducer
});

const mapDispatchToProps = (dispatch) => ({
    getContestByFilter: () => dispatch(getContestByFilter()),

});


export default connect(mapStateToProps, mapDispatchToProps)(activeContests);