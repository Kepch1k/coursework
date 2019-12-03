import React from 'react';
import style from './Login.module.scss';

import ContainerHeader from '../ContainerHeader/ContainerHeader';
import ContainerBody from './ContainerBody/ContainerBody';

function Login() {
    return (
        <div className={style.main}>
            <div className={style.mainContainer}>
                <div className={style.mainContentContainer}>
                    <ContainerHeader text={"SignUp"} link={'/signup'}/>
                    <ContainerBody/>
                </div>
            </div>
        </div>
    );
}

export default Login;
