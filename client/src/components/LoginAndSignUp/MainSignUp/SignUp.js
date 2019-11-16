import React from 'react';
import style from './SignUp.module.scss';

import ContainerHeader from '../ContainerHeader/ContainerHeader';
import ContainerBody from './ContainerBody/ContainerBody';

function SignUp() {
    return (
        <div className={style.main}>
            <div className={style.mainContainer}>
                <div className={style.mainContentContainer}>
                    <ContainerHeader text={"Login"} link={'/login'}/>
                    <ContainerBody/>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
