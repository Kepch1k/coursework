import React from 'react';
import {Field, getFormValues, reduxForm,} from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';
import renderField from './renderField';
import style from "./threeStepContestForm.module.scss";
import connect from "react-redux/es/connect/connect";

let formName = 'form';


let formPage = props => {
    formName = props['formName'];
    const {handleSubmit, previousPage, textSubmit, formContent, formValues} = props;
    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className={style.preBusinessStepForm}>
                <div className={style.businessStepForm}>
                    {formContent.fields.map((field, id) => {
                        return <Field key={id} {...field} component={renderField[field.component]}/>
                    })}
                </div>
            </div>
            <div className={style.preButtonOnForm}>
                <div className={style.ButtonOnForm}>

                    <div className={style.text}>
                        You are almost finished. Select a pricing package in the next step
                    </div>
                    <div className={style.buttons}>
                        <button type="button" className={style.prev} onClick={() => previousPage(formValues)}>
                            Back
                        </button>
                        <button type="submit" className={style.next}>
                            {textSubmit}
                        </button>
                    </div>

                </div>
            </div>

        </form>
    );
};

formPage = reduxForm({
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: false,
    enableReinitialize: true,
})(formPage);

const mapStateToProps = (state) => {
    return {
        state,
        types: state.contestReducers.selectedContestTypes,
        formNames: state.contestReducers.currentContestForm,
        temp: state.contestReducers.tempContests,
        formValues: getFormValues(state.contestReducers.currentContestForm)(state),
    };
};

export default connect(mapStateToProps)(formPage);
