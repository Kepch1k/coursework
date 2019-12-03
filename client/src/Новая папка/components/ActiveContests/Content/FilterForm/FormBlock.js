import React from 'react';
import {Field} from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';
import style from './FilterForm.module.scss'
import renderField from './renderFieldForFilter';

let filterForm = props => {
    return (
        <div className={style.FormBlock}>
            <div className={style.title}>
                {props.title}
            </div>
            <div className={style.content}>

                {props.fields.map((field, id) => {
                    return <Field key={id} {...field} component={renderField[field.component]}/>
                })}
            </div>
        </div>
    );
};

export default filterForm;
