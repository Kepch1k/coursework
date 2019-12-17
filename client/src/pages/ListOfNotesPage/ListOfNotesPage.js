import React from 'react';
import style from './ListOfNotesPage.module.scss';
import Header from '../../components/Header/Header'
import connect from 'react-redux/es/connect/connect';
import Footer from '../../components/Footer/Footer';
import MainBody from '../../components/ListOfNotesPage/MainBody/MainBody';
import Navigation from '../../components/Navigation/Navigation';

function ListOfNotesPage(props) {

    return (
        <div className={style.startPage}>

            <Navigation/>
            <div id={"mainPiece"} className={`${style.mainPiece}`}>
                {/*<Header/>*/}
                <div id={"content"} className={`${style.content}`}>
                   <MainBody/>
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
export default connect(mapStateToProps)(ListOfNotesPage);
