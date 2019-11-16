import React from 'react';
import Banner from '../../components/Dashboard/DashboardBanner/DashboardBanner';
import DashboardContent from '../../components/Dashboard/DashboardContent/DashboardContent';
import style from './Dashboard.module.scss';
import Header from "../../components/commonToAll/Header/Header";
import Footer from '../../components/commonToAll/Footer/footer';
import HeaderBottom from "../../components/commonToAll/HeaderBottom/HeaderBottom";
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router';

function dashboard(props) {
    if (!props.isFetching) {
        if (props.user === null) {
            return <Redirect to="/notFound"/>
        }
    }
    return (
        <div className={style.mainDashboard}>
            <Header/>
            <HeaderBottom/>
            <Banner/>
            <DashboardContent/>
            <Footer/>
        </div>);
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
    isFetching: state.userReducers.isFetching,
});

export default connect(mapStateToProps)(dashboard);