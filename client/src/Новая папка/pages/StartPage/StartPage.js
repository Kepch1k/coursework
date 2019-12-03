import React from 'react';
import style from './StartPage.module.scss';
import Header from '../../components/commonToAll/Header/Header';
import HeaderBottom from '../../components/commonToAll/HeaderBottom/HeaderBottom';
import Banner from '../../components/StartPageComponents/Banner/Banner';
import Footer from '../../components/commonToAll/Footer/footer';
import WhySquadhelp from '../../components/StartPageComponents/WhySquadhelp/WhySquadhelp';


function StartPage() {

    return (
        <div className={style.body}>
            <Header/>
            <HeaderBottom/>
            <Banner/>
            <WhySquadhelp/>
            {/*<GrowBusiness/>*/}
            {/*<HowItWorksHome/>*/}
            <Footer/>
        </div>
    );
}

export default StartPage;
