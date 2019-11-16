import React, {useEffect, useState} from 'react';
import FromContent from '../../../constants/ContestsFormContet';
import Pages from '../../../constants/ContestsFormContet';
import FormPage from './formPage';
import FormGetEmail from '../../ModalForm/formGetEmail';
import CreditCard from './CreditCard/CreditCard';
import 'react-toastify/dist/ReactToastify.css';
import {SubmissionError} from "redux-form";
import {
    checkEmail,
    contestProgressing,
    createOrUpdateTempContest,
    resetCardResult,
    selectedContestType,
    sendCard,
    sendContest
} from "../../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import history from '../../../boot/browserHistory';
import Modal from 'react-modal';
import style from "./threeStepContestForm.module.scss";
import {Redirect} from 'react-router';
import {toast} from "react-toastify";
import check from '../../../utils/checkFile(s)Size';

const _ = require('lodash');

const customStyles = {
    content: {
        zIndex: 20,
    }
};


Modal.setAppElement('#root');

function contestForm(props) {
    const [form, setForm] = useState({contestTypes: props.types[0], id: 0});
    const user = props.user;
    const submit = (values) => {
        const errors = {};
        if (!values.number) {
            errors.number = "Required"
        } else if (values.number.length < 16) {
            errors.number = "You didn't enter all numbers"
        }
        if (!values.expiry) {
            errors.expiry = "Required"
        } else if (values.expiry.length < 5) {
            errors.expiry = "You didn't enter all numbers"
        }
        if (!values.cvc) {
            errors.cvc = "Required"
        } else if (values.cvc.length < 3) {
            errors.cvc = "You didn't enter all numbers"
        }

        if (_.isEmpty(errors)) {
            let sum = 0;
            const contestsId = [];
            for (let key in props.tempContests) {
                if (props.tempContests.hasOwnProperty(key)) {
                    sum += props.tempContests[key].price;
                    contestsId.push(props.tempContests[key].id);
                }
            }
            props.sendCard({...values, amountPayable: sum, ids: contestsId});
        }
        return errors
    };
    const funcSubmit = (pageForm) => {
        return (values) => {
            const errors = {};
            if (values['uploadFile'] || (!_.isEmpty(values['uploadFile']))) {
                const resOfChecking = check(values['uploadFile'], 100);
                if (resOfChecking) {
                    errors['uploadFile'] = resOfChecking;
                }
            }
            Pages[pageForm].required.map((key) => {
                if (!values[key] || _.isEmpty(values[key])) {
                    errors[key] = 'Please fill this field';
                }
            });

            if (_.isEmpty(errors)) {
                window.scrollTo(0, 0);
                if (props.types.length - 1 > form.id) {


                    props.sendContest({...values, typeOfContest: pageForm}, props.user.id);
                    props.contestProgressing(3 + form.id, props.types[form.id + 1]);
                    return setForm({contestTypes: props.types[form.id + 1], id: form.id + 1});
                } else {
                    props.sendContest({...values, typeOfContest: pageForm}, props.user.id);
                    props.contestProgressing(3 + form.id, null);
                    return setForm({contestTypes: "CHECKOUT", id: form.id + 1});
                }
            } else {
                throw new SubmissionError({
                    ...errors
                });
            }
        };
    };
    const renderForm = (currentFormPage, formName) => {
        return <FormPage formContent={currentFormPage} formName={formName} onSubmit={funcSubmit(formName)}
                         initialValues={props.state.contestReducers.tempContests[props.state.contestReducers.currentContestForm]}
                         form={formName}
                         previousPage={(values) => {
                             window.scrollTo(0, 0);

                             if (form.id === 0) {
                                 history.goBack();
                                 props.selectedContestType([]);
                                 props.contestProgressing(1, null);
                             } else {
                                 if (values) {
                                     props.createOrUpdateTempContest(values)
                                 }
                                 props.contestProgressing(form.id + 1, props.types[form.id - 1]);
                                 return setForm({contestTypes: props.types[form.id - 1], id: form.id - 1});
                             }
                         }}
                         textSubmit={(props.types.length - 1 === form.id) ? "Submit" : "Next"}
        />
    };
    const resetStatus = () => props.resetCardResult(null);
    const notify = (msg) => {
        const props = {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 6000,
        };
        resetStatus();
        if (msg === "Successful") {
            return toast.success(msg, props)
        } else {
            return toast.error(msg, props)
        }
    };

    useEffect(() => {
        (props.creditCardReducers.resultTransaction) && notify(props.creditCardReducers.resultTransaction)
    });

    return (
        <div>
            {}
            {(props.creditCardReducers.resultTransaction === "Successful") && <Redirect to="/"/>}
            <Modal
                isOpen={!user}
                onAfterOpen={() => {
                }}
                onRequestClose={() => {
                }}
                style={customStyles}
                className={style.modal}
                overlayClassName={style.modalOverlay}
            >
                <FormGetEmail title={'Let\'s Get Started'} longTitle={null}
                              preInput={'First, tell us your email address so we can automatically save your contest brief. This way you can get back to it at any time.'}
                              button={'Continue Your Brief'} createAction={props.checkEmail}/>

            </Modal>
            {form.contestTypes === 'LOGO' && renderForm(FromContent.LOGO, 'LOGO')}
            {form.contestTypes === 'NAME' && renderForm(FromContent.NAME, 'NAME')}
            {form.contestTypes === 'TAGLINE_OR_SLOGAN' && renderForm(FromContent.TAGLINE_OR_SLOGAN, 'TAGLINE_OR_SLOGAN')}
            {(form.contestTypes === 'CHECKOUT') && <CreditCard submit={submit}/>}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state,
        types: state.contestReducers.selectedContestTypes,
        user: state.userReducers.user,
        tempContests: state.contestReducers.tempContests,
        creditCardReducers: state.creditCardReducers
    };
};
const mapDispatchToProps = (dispatch) => ({
    selectedContestType: (contestTypes) => dispatch(selectedContestType(contestTypes)),
    contestProgressing: (value, value2) => dispatch(contestProgressing(value, value2)),
    sendContest: (value, value2) => dispatch(sendContest(value, value2)),
    createOrUpdateTempContest: (value) => dispatch(createOrUpdateTempContest(value)),
    sendCard: (value) => dispatch(sendCard(value)),
    checkEmail: (values) => dispatch(checkEmail(values)),
    resetCardResult: (val) => dispatch(resetCardResult(val)),
});
export default connect(mapStateToProps, mapDispatchToProps)(contestForm);