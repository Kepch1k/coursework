import React from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';
import style from "../CreatContestComponents/threeStepContestForm/threeStepContestForm.module.scss";

const promises = () => new Promise(resolve => resolve());
const yup = require('yup');
const schema = require('../../models/userSchema');
const renderField = ({input, placeholder, type, meta: {touched, error}}) => {
    return <>
        <div>
            <input className={style.inputEmail}{...input} placeholder={placeholder} type={type}/>
        </div>
        {touched && error && <div className={style.errorMsg}>{error}</div>}</>
};

let formResetPassword = props => {
    const {handleSubmit} = props;
    const submit = (values) => {

        return promises().then(async () => {
            let resPassword, resPasswordConfirm;

            try {
                resPassword = await yup.reach(schema, 'password').isValid(values.password);
                resPasswordConfirm = await yup.reach(schema, 'password').isValid(values.confirmPassword);
            } catch (e) {
            }
            if (!resPassword) {
                throw new SubmissionError({
                    password: 'Password is not valid. Use password with at least 8 chars,one lowercase and uppercase char and 1 number or special char',
                    _error: 'password reset failed!',
                });
            } else if (!resPasswordConfirm) {
                throw new SubmissionError({
                    confirmPassword: 'Password is not valid. Use password with at least 8 chars,one lowercase and uppercase char and 1 number or special char',
                    _error: 'password reset failed!',
                });
            } else if (resPassword !== resPasswordConfirm) {
                throw new SubmissionError({
                    confirmPassword: 'Password Confirmation required',
                    _error: 'password reset failed!',
                });
            }
            props.createAction({...values, email: props.email});
        });
    };
    return (
        <form onSubmit={handleSubmit(submit)} className={style.formGetEmail}>
            <div className={style.title}>{props.title}</div>
            <div className={style.preInput}>{props.preInput}</div>
            <Field name={'password'} type={'password'} component={renderField}/>
            <Field name={'confirmPassword'} type={'password'} component={renderField}/>
            <button type="submit" className={style.button}>
                {props.button}
            </button>
            {props['buttonToBack'] && <button onClick={() => props.back()} className={style.button}>
                {props.buttonToBack}
            </button>}
        </form>
    );
};

formResetPassword = reduxForm({
    form: 'formResetPassword',
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: false,
    enableReinitialize: true,
})(formResetPassword);

export default formResetPassword;
