import React from 'react';
import {Field, reduxForm, SubmissionError,} from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';
import style from "../CreatContestComponents/threeStepContestForm/threeStepContestForm.module.scss";

const promises = () => new Promise(resolve => resolve());
const yup = require('yup');
const schema = require('../../models/userSchema');
const renderField = ({input, placeholder, label, type, meta, meta: {touched, error, active}}) => {
    return <div>
        <input className={style.inputEmail}{...input} placeholder={placeholder} type={type}/>
        {touched && error && <div className={style.errorMsg}>{error}</div>}
    </div>
};

let formGetEmail = props => {
    const {handleSubmit} = props;
    const submit = (values) => {

        return promises().then(async () => {
            let resEmail;
            try {
                resEmail = await yup.reach(schema, 'email').isValid(values.email);
            } catch (e) {
            }
            if (!resEmail) {
                throw new SubmissionError({
                    email: 'Email is not valid format',
                    _error: 'Login failed!',
                });
            }
            props.createAction({...values, title: props.title, longTitle: props.longTitle});
        });
    };
    return (
        <form onSubmit={handleSubmit(submit)} className={style.formGetEmail}>
            <div className={style.title}>{props.title}</div>
            <div className={style.preInput}>{props.preInput}</div>
            <Field name={'email'} type={'email'} component={renderField}/>
            <button type="submit" className={style.button}>
                {props.button}
            </button>
            {props['buttonToBack'] && <button onClick={() => props.back()} className={style.button}>
                {props.buttonToBack}
            </button>}
        </form>
    );
};

formGetEmail = reduxForm({
    form: 'formGetEmail',
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: false,
    enableReinitialize: true,
})(formGetEmail);

export default formGetEmail;
