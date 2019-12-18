import React from 'react';
import style from './NotePage.module.scss';
import Header from '../../components/Header/Header'
import connect from 'react-redux/es/connect/connect';
import Footer from '../../components/Footer/Footer';
import MainBody from '../../components/NotePage/MainBody/MainBody';
import Navigation from '../../components/Navigation/Navigation';

function NotePage(props) {

    return (
        <div className={style.startPage}>

            <Navigation/>
            <div id={"mainPiece"} className={`${style.mainPiece}`}>
                {/*<Header/>*/}
                {(!!props.user)? <div id={"content"} className={`${style.content}`}>
                    <MainBody/>
                </div>: <div className={`${style["error"]} ${style["no-401"]}`}/>}
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
export default connect(mapStateToProps)(NotePage);
