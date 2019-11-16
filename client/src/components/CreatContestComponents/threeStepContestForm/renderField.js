import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import SelectList from 'react-widgets/lib/SelectList';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import Select from 'react-select';
import style from "./threeStepContestForm.module.scss";

const customStyles = {
    container: (base, state) => ({
        ...base,
        minHeight: "40px",
        border: "none",
        boxShadow: "none",
        fontSize: "16px",
        borderRadius: "7px",
        width: "100%",
        marginBottom: "10px"
    }),
    control: (base, state) => ({
        ...base,
        minHeight: "40px",
        border: "2px solid #d0d0d0",
        borderColor: state.isActive ? "#2f8dff" : "#d0d0d0",
        boxShadow: "none",
        backgroundColor: "white",
    }),
    input: (base, state) => ({
        ...base,
        minHeight: "36px",
        boxShadow: "none",
        backgroundColor: "white",
        maxWidth: "100%!important",
    }),
    valueContainer: (base, state) => ({
        ...base,
        minHeight: "32px",
    }),
    multiValue: (base, state) => ({
        ...base,
        backgroundColor: " #e4e4e4",
        border: "1px solid #aaa",
        borderRadius: "4px",
        cursor: "default",
        float: "left",
        marginRight: "5px",
        marginTop: " 7px",
        padding: " 0 5px",
    }),
    option: base => ({
        ...base,
        paddingLeft: " 25px",
        fontSize: "16px",
        cursor: "pointer",
    }),
};

const renderFileInput = ({input: {value: omitValue, onChange, onBlur, ...inputProps}, meta: {touched, error}, ...props}) => {

    const adaptFileEventToValue = delegate => e => delegate(e.target.files);

    return (
        <div className={style.renderField}>
            <label className={style.forLabel}>{props.label}</label>
            <input className={style.inputFile}
                   onChange={adaptFileEventToValue(onChange)}
                   onBlur={adaptFileEventToValue(onBlur)}
                   type="file"
                   multiple={props.multiple}
                   value={inputProps.value}
                   {...props.input}
                   {...props}
            />
            {touched && error && <span className={style.errorMsg}>{error}</span>}
        </div>
    );
};

const renderFieldSelect = ({input, placeholder, label, type, options, isMulti, defaultValue, meta: {touched, error, active}}) => {

    const color = active ? "#2f8dff" : "#d0d0d0";
    return <div className={style.renderFieldForSelect}>
        <label className={style.forLabel}>{label}</label>
        <div className={style.forSelect}>
            <Select style={{borderColor: color}}
                    value={input.value}
                    name={input.name}
                    onChange={(value) => input.onChange(value)}
                    type={type}
                    placeholder={placeholder}
                    styles={customStyles}
                    options={options}
                    isMulti={isMulti}
                    defaultValue={defaultValue}
            />
            {touched && error && <span className={style.errorMsg}>{error}</span>}
        </div>
    </div>
};


const renderField = ({input, placeholder, label, type, meta, meta: {touched, error, active}}) => {

    const color = active ? "#2f8dff" : "#d0d0d0";

    return <div className={style.renderField}>
        <label className={style.forLabel}>{label}</label>
        <div className={style.preForInputs} style={{borderColor: color}}>
            <input className={style.forInputs}  {...input} placeholder={placeholder} type={type}/>
        </div>
        {touched && error && <span className={style.errorMsg}>{error}</span>}
    </div>
};


const renderDropdownList = ({input, data, valueField, textField}) =>
    <DropdownList {...input}
                  data={data}
                  valueField={valueField}
                  textField={textField}
                  onChange={input.onChange}/>;

const renderMultiselect = ({input, data, valueField, options, textField, label, meta: {touched, error, active}, placeholder}) => {
    return <div className={style.renderField}>
        <label className={style.forLabel}>{label}</label>
        <Multiselect
            {...input}
            options={options}
            placeholder={placeholder}
            onBlur={() => input.onBlur()}
            value={input.value || []}
            data={data}
            valueField={valueField}
            textField={textField}
        /> {touched && error && <span>{error}</span>}
    </div>
};


const renderSelectList = ({input, data}) =>
    <SelectList {...input}
                onBlur={() => input.onBlur()}
                data={data}/>;

const renderColorSelector = ({input, data}) => (
    <select {...input}>
        <option value="">Select a color...</option>
        {data.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
);

export default {
    renderField,
    renderDropdownList,
    renderMultiselect,
    renderSelectList,
    renderColorSelector,
    renderFieldSelect,
    renderFileInput
}


