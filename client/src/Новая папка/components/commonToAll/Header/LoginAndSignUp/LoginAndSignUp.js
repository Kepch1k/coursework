import React from 'react';
import style from './LoginAndSignUp.module.scss';
import LoginSignUpContent from './LoginSignUpContent/LoginSignUpContent';

function LoginAndSignUp() {
    return (
        <div className={style.mainSignUpAndLogin}>
            <LoginSignUpContent/>
        </div>
    );
}

export default LoginAndSignUp;
