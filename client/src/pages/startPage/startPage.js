import React from 'react';
import style from './startPage.module.scss';
import Header from '../../components/commonToAll/Header/Header';
import HeaderBottom from '../../components/commonToAll/HeaderBottom/HeaderBottom';
import Banner from '../../components/StartPageComponents/Banner/Banner';
import Footer from '../../components/commonToAll/Footer/footer';
import WhySquadhelp from '../../components/StartPageComponents/WhySquadhelp/WhySquadhelp';
import Socket from '../../api/socket';


function startPage() {

    return (
        <div className={style.body}>

            <Header/>

            {/*<Navigation/>*/}

            {/*<Contain/>*/}

            <Footer/>
        </div>
    );
}

export default startPage;
