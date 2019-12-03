import React from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import Select from 'react-select';
import style from "./renderFieldForFilter.module.scss";

const customStyles = {
    container: (base, state) => ({
        ...base,
        width: "100%",
        height: "34px",
        fontSize: "14px",
        color: "#555",
        backgroundColor: "#fff",
        backgroundImage: "none",
        border: "1px solid #ccc",
        borderRadius: "4px",
    }),
    control: (base, state) => ({
        ...base,
        border: "none",
        maxHeight: "32px",
        minHeight: "0",
    }),
    input: (base, state) => ({
        ...base,
    }),
    valueContainer: (base, state) => ({
        ...base,
        minHeight: "32px",
    }),
    singleValue: (base, state) => ({
        ...base,
        overflow: "visible",
    }),
    option: base => ({
        ...base,
        paddingLeft: " 25px",
        fontSize: "16px",
        cursor: "pointer",
    }),
};


const renderFieldSelect = ({input, placeholder, label, type, options, isMulti, defaultValue, meta: {touched, error, active}}) => {
    const color = active ? "#2f8dff" : "#d0d0d0";
    return <div className={style.renderField}>
        <label>{label}</label>
        <div>
            <Select style={{borderColor: color}}
                    value={input.value || defaultValue}
                    name={input.name}
                    onChange={(value) => input.onChange(value)}
                    type={type}
                    placeholder={placeholder}
                    styles={customStyles}
                    options={options}
                    isMulti={isMulti}
                    onBlur={(value) => input.onBlur(input.value)}
            />
        </div>
    </div>
};


const renderField = ({input, placeholder, label, title, type, meta, meta: {touched, error, active}}) => {

    const color = active ? "#2f8dff" : "#d0d0d0";

    return <div className={style.renderField}>
        <label className={style.forTitle}>{title}</label>
        <div>
            <input className={style.forInputs} style={{borderColor: color}} {...input} placeholder={placeholder}
                   type={type}/>
        </div>
    </div>
};

const renderFieldCheckbox = ({input, placeholder, label, checked, type, meta, meta: {touched, error, active}}) => {

    const color = active ? "#2f8dff" : "#d0d0d0";
    return <div className={style.renderField}>

        <div className={style.preForInputCheckBox} style={{borderColor: color}}>
            <input className={style.forInputCheckBox}  {...input} placeholder={placeholder} type={type}/>
            <label>{label}</label>
        </div>
    </div>
};

export default {
    renderField,
    renderFieldSelect,
    renderFieldCheckbox,
}


