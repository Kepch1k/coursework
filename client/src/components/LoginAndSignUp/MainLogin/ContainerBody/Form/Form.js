import React from 'react';
import style from './Form.module.scss';
import {Field, reduxForm} from 'redux-form';
import {checkEmail, setModalState} from '../../../../../actions/actionCreator';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-modal';
import FormGetEmail from "../../../../ModalForm/formGetEmail";

const customStyles = {
    content: {
        zIndex: 20,
    }
};
const renderField = ({
                         input,
                         label,
                         type,
                         meta: {asyncValidating, touched, error},
                     }) => {

    return <div>
        <div className={asyncValidating ? 'async-validating' : ''}>
            <input {...input} type={type} placeholder={label} style={{borderColor: error ? "red" : "white"}}/>
            {touched && error && <div className={style.errorContainer}>{error}</div>}
        </div>
    </div>
};
Modal.setAppElement('#root');

function Form(props) {
    const {handleSubmit, submitting} = props;
    const baned = props.state.userReducers.banned ? 'block' : 'none';
    const login = props.state.userReducers.loginFailed ? 'block' : 'none';
    return (
        <>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className={style.loginFailed} style={{display: login}}>Invalid Email or Password</div>
                <div className={style.loginFailed} style={{display: baned}}>You are banned</div>
                <div className={style.Row}>
                    <Field className={style.Field}
                           name="email"
                           component={renderField}
                           type="text"
                           label="Email address"
                    />
                </div>
                <div className={style.Row}>
                    <Field className={style.Field}
                           name="password"
                           component={renderField}
                           type="password"
                           label="Password"
                    />
                </div>
                <div className={style.Row}>
           <span className={style.RememberMe}>
             <div className={style.flexBox}>
               <span style={{width: '24px', height: '13px'}}>
                 <Field name="rememberMe" component="input" type="checkbox" value={true}/>
                 </span>
               <span><label>Remember&nbsp;</label></span><span><label>me</label></span>
             </div>
           </span>
                    <span className={style.ForgotPassword} onClick={() => props.setModalState({confirmEmail: true})}>
             Forgot Password
           </span>
                </div>
                <div className={style.Row}>
                    <button className={style.Field}
                            style={{
                                backgroundColor: '#28d2d0',
                                borderColor: '#28d2d0',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                            type="submit" disabled={submitting}>LOGIN
                    </button>
                </div>

                <div className={style.Row} style={{marginTop: '30px'}}>
                    <button className={style.FieldSocial} type="submit"><span className="fab fa-facebook-f"
                                                                              aria-hidden="true"/> Sign in with Facebook
                    </button>
                </div>

                <div className={style.Row}>
                    <button className={style.FieldSocial} style={{background: '#dd4b39', borderColor: '#dd4b39'}}
                            type="submit">
                        <span className="fab fa-google"/> Sign in with Google
                    </button>
                </div>
            </form>
            <Modal
                isOpen={props.modal.confirmEmail}
                onAfterOpen={() => {
                }}
                onRequestClose={() => {
                }}
                style={customStyles}
                className={style.modal}
                overlayClassName={style.modalOverlay}
            >
                <FormGetEmail createAction={props.checkEmail} title={'Reset the password'}
                              longTitle={'Click on the link to reset the password'}
                              preInput={'Please write your mail that you indicated during registration.'}
                              button={'Send email to reset'} buttonToBack={'Back'}
                              back={() => props.setModalState({confirmEmail: false})}/>
            </Modal></>
    );
}

Form = reduxForm({
    form: 'login',
    destroyOnUnmount: true,

})(Form);

const mapStateToProps = (state) => {
    return {
        state,
        fromStore: state.userReducers.data,
        sss: state.mailServiceReducers,
        modal: state.modalReducers
    };
};
const mapDispatchToProps = (dispatch) => ({
    setModalState: (value) => dispatch(setModalState(value)),
    checkEmail: (values) => dispatch(checkEmail(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);