import React from 'react';
import style from './LoginSignUpContent.module.scss';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

function LoginSignUpContent() {
    return (
        <div className={style.main}>
            <Login/>
            <SignUp/>
        </div>
    );
}

export default LoginSignUpContent;
