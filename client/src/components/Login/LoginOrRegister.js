import React from 'react';
import style from './Login.module.scss';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {userLogin,userSignUp} from '../../actions/actionCreator';
import connect from "react-redux/es/connect/connect";
import asyncValidate from './asyncValidate';
const _ = require('lodash');
const renderField = ({
                         input,
                         className,
                         type,
                         value,
                         value_,
                         checked,
                         id,//meta,
                         meta: {asyncValidating, touched, error},
                     }) => {
    value=(value_)?value_:value;
    return<>
        <input id={id} {...input} type={type} className={className} value={value} checked={checked===value}/>
        {touched && error && <div className={`${style["error"]}`}>{error}</div>}
    </>

};

function loginOrRegister(props) {
    const {handleSubmit,submitting} = props;


    const  loginOrRegisterSubmit = (parameters) =>{
        console.log(parameters);
        const toSend={};
        if(parameters.tab==="login"){
            for(let key in {..._.omit(parameters, "tab")}){
                if(key.indexOf("login/")!==-1) {
                    let fieldName = key.slice(6, key.length);
                    toSend[fieldName] = parameters[key];
                }
            }
            props.userLogin({dataToSend: {...toSend}});
        }else{
            for(let key in {..._.omit(parameters, ["tab","register/repeat_password"])}){
                if(key.indexOf("register/")!==-1){
                    let fieldName=key.slice(9,key.length);
                    toSend[fieldName]=parameters[key];
                }

            }
            props.userSignUp({dataToSend:{...toSend}});
        }
console.log(props.user);
    };


    return (
        <form onSubmit={handleSubmit(loginOrRegisterSubmit)}>
            <div className={style.loginMain}>
                <div className={`${style["login-wrap"]}`}>
                    <div className={`${style["login-html"]} ${style["scroll"]}`} >
                        <Field id="tab-1" name="tab" component={renderField} checked={(props.tab)?props.tab:props.initialValues.tab} type="radio" props={{ value: "login" }} className={`${style["sign-in"]}`}/><label htmlFor="tab-1" className=  {`${style["tab"]}`}>Вход</label>
                        <Field id="tab-2" name="tab" component={renderField} checked={(props.tab)?props.tab:props.initialValues.tab} type="radio" props={{ value: "register" }} className={`${style["sign-up"]}`}/><label htmlFor="tab-2" className=  {`${style["tab"]}`}>Регистрация</label>
                            <div className=  {`${style["login-form"]}`}>
                            <div className=  {`${style["sign-in-htm"]}`}>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="pass" className=  {`${style["label"]}`}>Почта</label>
                                    <Field
                                        id="login/email"
                                        name="login/email"
                                        component={renderField}
                                        type="text"
                                        className={`${style["input"]}`}
                                    />
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="pass" className="label">Пароль</label>
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
                                    <label htmlFor="check"><span className={`${style["icon"]}`}/>Запомнить меня</label>
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <button  className={`${style["button"]}`}
                                             type="submit">Войти
                                    </button>
                                </div>
                                <div className={`${style["hr"]}`}/>
                                <div className={`${style["foot-lnk"]}`}>
                                    <a href={"forgot"}>Забыли Пароль?</a>
                                </div>
                            </div>
                            <div className={`${style["sign-up-htm"]}`}>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="pass" className=  {`${style["label"]}`}>Почта</label>
                                    <Field
                                        id="register/email"
                                        name="register/email"
                                        component={renderField}
                                        type="text"
                                        className={`${style["input"]}`}
                                    />
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="user" className=  {`${style["label"]}`}>Имя пользователя</label>
                                    <Field
                                        id="register/username"
                                        name="register/username"
                                        component={renderField}
                                        type="text"
                                        className={`${style["input"]}`}
                                    />
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="user" className=  {`${style["label"]}`}>Псевдоним</label>
                                    <Field
                                        id="register/displayName"
                                        name="register/displayName"
                                        component={renderField}
                                        type="text"
                                        className={`${style["input"]}`}
                                    />
                                </div>
                                <div className=  {`${style["group"]}`}>
                                    <label htmlFor="pass" className=  {`${style["label"]}`}>Пароль</label>
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
                                    <label htmlFor="pass" className=  {`${style["label"]}`}>Подтверждение Пароля</label>
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
                                    <button  className={`${style["button"]}`}
                                            type="submit">Зарегестрироватся
                                    </button>
                                </div>
                                <div className={`${style["hr"]}`}/>
                                <div className={`${style["foot-lnk"]}`}>
                                    <label htmlFor="tab-1">Уже Зарегестрированы?</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
}

loginOrRegister = reduxForm({
    form:"login/reg",
    enableReinitialize: true,
    asyncValidate,
    asyncBlurFields: ['login/email','login/password', 'register/email', 'register/username', 'register/displayName', 'register/password', 'register/repeat_password']

})(loginOrRegister);

const selector = formValueSelector('login/reg');

const mapStateToProps = (state) => {
    const tab = selector(state, 'tab');
    return {
        state,
        initialValues:state.formInitialValues["login/reg"],
        tab,
        user: state.userReducers.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    userLogin: (dataToSend) => dispatch(userLogin(dataToSend)),
    userSignUp: (dataToSend) => dispatch(userSignUp(dataToSend)),

});

export default connect(mapStateToProps,mapDispatchToProps)(loginOrRegister);