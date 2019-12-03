import React from 'react';
import style from './Login.module.scss';
import { Field, reduxForm, reset } from 'redux-form';
import connect from "react-redux/es/connect/connect";
//              {`${style[]}`}

const renderField = ({
                         input,
                         className,
                         label,
                         type,
                         value,
                         value_,
                         checked,
                         id,
                         meta: {asyncValidating, touched, error},
                     }) => {
    value=(value_)?value_:value;
    return<>
        <input id={id} {...input} type={type} className={className} value={value} checked={checked}/>
        {touched && error && <div>{error}</div>}
    </>

};

function Login(props) {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit((params)=>{console.log(params)})}>
            <div className={style.loginMain}>
                <div className={`${style["login-wrap"]}`}>
                    <div className={`${style["login-html"]}`}>
                        <Field id="tab-1" name="tab" component={renderField} type="radio" value={"first"} className={`${style["sign-in"]}`} checked/><label htmlFor="tab-1" className=  {`${style["tab"]}`}>Sign In</label>
                        <Field id="tab-2" name="tab" component={renderField} type="radio" value={"second"} className={`${style["sign-up"]}`}/><label htmlFor="tab-2" className=  {`${style["tab"]}`}>Sign Up</label>
                        <div className=  {`${style["login-form"]}`}>
                            <div className=  {`${style["sign-in-htm"]}`}>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="user" className=  {`${style["label"]}`}>Username</label>
                                    <Field
                                        id="login/user"
                                        name="login/user"
                                        component={renderField}
                                        type="text"
                                        className={`${style["input"]}`}
                                    />
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="pass" className="label">Password</label>
                                    <Field
                                        id="login/password"
                                        name="login/password"
                                        component={renderField}
                                        type="password"
                                        datatype="password"
                                        className={`${style["input"]}`}
                                    />
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <Field id="check" name="keepMe" component="input" type="checkbox" className={`${style["check"]}`}/>
                                    <label htmlFor="check"><span className={`${style["icon"]}`}/> Keep me Signed in</label>
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <Field
                                        name="submit"
                                        component={renderField}
                                        type="submit"
                                        value_={"Sign In"}
                                        className={`${style["button"]}`}
                                    />
                                </div>
                                <div className={`${style["hr"]}`}/>
                                <div className={`${style["foot-lnk"]}`}>
                                    <a href={"forgot"}>Forgot Password?</a>
                                </div>
                            </div>
                            <div className={`${style["sign-up-htm"]}`}>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="user" className=  {`${style["label"]}`}>Username</label>
                                    <Field
                                        id="register/user"
                                        name="register/user"
                                        component={renderField}
                                        type="text"
                                        className={`${style["input"]}`}
                                    />
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="pass" className=  {`${style["label"]}`}>Password</label>
                                    <Field
                                        id="register/repeat_password"
                                        name="register/repeat_password"
                                        component={renderField}
                                        type="password"
                                        datatype="password"
                                        className={`${style["input"]}`}
                                    />
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="pass" className=  {`${style["label"]}`}>Repeat Password</label>
                                    <Field
                                        id="register/password"
                                        name="register/password"
                                        component={renderField}
                                        type="password"
                                        datatype="password"
                                        className={`${style["input"]}`}
                                    />
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="pass" className=  {`${style["label"]}`}>Email Address</label>
                                    <Field
                                        id="email"
                                        name="email"
                                        component={renderField}
                                        type="text"
                                        className={`${style["input"]}`}
                                    />
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <Field
                                        name="submit"
                                        component={renderField}
                                        type="submit"
                                        value_={"Sign Up"}
                                        className={`${style["button"]}`}
                                    />
                                </div>
                                <div className={`${style["hr"]}`}/>
                                <div className={`${style["foot-lnk"]}`}>
                                    <label htmlFor="tab-1">Already Member?</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
}

Login = reduxForm({
    form:"login/reg",
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: false,
    enableReinitialize: true,

})(Login);


const mapStateToProps = (state) => {
    return {
        state,
        formValues: {Active: true},
    };
};

export default connect(mapStateToProps)(Login);