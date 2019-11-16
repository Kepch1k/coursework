import React from 'react';
import {reduxForm,} from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';
import style from './FilterForm.module.scss';
import FormBlock from './FormBlock';
import Content from '../../../../constants/formFilterContent';
import connect from "react-redux/es/connect/connect";

const promises = () => new Promise(resolve => resolve());


let filterForm = props => {
    const {previousPage, textSubmit, formContent, formValues} = props;
    return (
        <form>
            <div className={style.allFormBlocks}>
                {
                    Content.FILTERS.map((item, id) => {
                        return <FormBlock key={id} title={item.title} fields={item.fields}/>
                    })
                }
            </div>
        </form>
    );
};

filterForm = reduxForm({

    destroyOnUnmount: true,
    forceUnregisterOnUnmount: false,
    enableReinitialize: true,

})(filterForm);

const mapStateToProps = (state) => {
    return {
        state,
        formValues: {Active: true},
    };
};

export default connect(mapStateToProps)(filterForm);
