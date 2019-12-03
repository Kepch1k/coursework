import React from 'react';
import style from './StartPage.module.scss';
import Header from '../../components/Header/Header'
import connect from 'react-redux/es/connect/connect';
import HeaderBottom from '../../components/commonToAll/HeaderBottom/HeaderBottom';
import Banner from '../../components/StartPageComponents/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import WhySquadhelp from '../../components/StartPageComponents/WhySquadhelp/WhySquadhelp';
import Socket from '../../api/socket';


function StartPage(props) {

    return (
        <div className={style.startPage}>


            {/*<HeaderBottom/>*/}
            {/*<Banner/>*/}
            {/*<WhySquadhelp/>*/}
            {/*    {"aasda"}*/}
            {/*<div style={{height:"100vh",width:"1px;"}}/>*/}
            <Navigation/>
            <div id={"mainPiece"} className={`${style.mainPiece}`}>
                <Header/>
                <div id={"content"} className={`${style.content}`}>
                    Main body
                </div>
                <Footer/>
            </div>
            {/*<HowItWorksHome/>*/}

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user,
        userContests: state.userContestsReducers,
    };
};
export default connect(mapStateToProps)(StartPage);

//export default StartPage;
