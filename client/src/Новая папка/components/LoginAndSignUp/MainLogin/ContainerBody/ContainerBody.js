import React from 'react';
import style from './ContainerBody.module.scss';
import Form from './Form/Form';
import {SubmissionError} from 'redux-form';
import {userLogin} from '../../../../actions/actionCreator';
import connect from 'react-redux/es/connect/connect';

const yup = require('yup');
const schema = require('../../../../models/userSchema');
const promises = () => new Promise(resolve => resolve());


function ContainerBody(props) {

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
            } else if (!values.password) {
                throw new SubmissionError({
                    password: 'Required',
                    _error: 'Login failed!',
                });
            }

            const dataToSend = {
                email: values.email,
                password: values.password,
                rememberMe: (!!values.rememberMe)
            };
            props.userLogin({dataToSend: dataToSend, pageToRedirect: props.pageToRedirect});
        });
    };
    return (
        <div className={style.main}>
            <div className={style.title}><h2>LOGIN TO YOUR ACCOUNT </h2></div>
            <div className={style.mainForm}>
                <Form onSubmit={submit}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state,
        fromStore: state.userReducers.data,
        error: state.userReducers.error,
        pageToRedirect: state.siteNavigationReducers.pageToRedirect
    };
};
const mapDispatchToProps = (dispatch) => ({
    userLogin: (dataToSend) => dispatch(userLogin(dataToSend)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContainerBody);

