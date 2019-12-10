import React from 'react';
import style from './StartPage.module.scss';
import Header from '../../components/Header/Header'
import connect from 'react-redux/es/connect/connect';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';

function StartPage(props) {

    return (
        <div className={style.startPage}>

            <Navigation/>
            <div id={"mainPiece"} className={`${style.mainPiece}`}>
                <Header/>
                <div id={"content"} className={`${style.content}`}>
                    Main body
                </div>
                <Footer/>
            </div>
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
