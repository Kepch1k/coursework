import React from 'react';
import {Field, reduxForm,} from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';

import style from './FormForEntry.module.scss';
import renderField from "../../CreatContestComponents/threeStepContestForm/renderField";

const {FIELDS} = require('../../../constants/FieldsForEntry');


let formForEntry = props => {
    const {submitting, handleSubmit} = props;
    switch (props.type) {
        case"NAME": {
            break;
        }
        case"LOGO": {
            break;
        }
        case"TAGLINE_OR_SLOGAN": {
            break;
        }
        default: {
            break;
        }
    }
    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className={style.forForm}>

            {<Field {...FIELDS[props.type]} component={renderField[FIELDS[props.type].component]}/>}
            <div className={style.forSubmitContainer}>
                <button className={style.forSubmit}
                        type="submit" disabled={submitting}>SUBMIT
                </button>
            </div>
        </form>
    );
};

formForEntry = reduxForm({
    form: "Entry",
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: false,
    enableReinitialize: true,
})(formForEntry);
export default (formForEntry);
