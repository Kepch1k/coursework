import React,{useState} from 'react';
import style from './ManagePanel.module.scss';
import connect from 'react-redux/es/connect/connect';
import {saveNote,updateNote,deleteNote} from "../../actions/actionCreator";

function ManagePanel(props) {

    return (
        <div className={`${style.managePanel}`}>
            <div className={`${style.button_wrapper}`}>
                <div className={`${style.btn} ${style.third}`} onClick={()=>{props.saveNote(props.note)}}>
                   Save
                </div>
            </div>
            <div className={`${style.button_wrapper}`}>
                <div className={`${style.btn} ${style.fifth}`} onClick={()=>{props.updateNote(props.note)}}>
                   Update
                </div>
            </div>
            <div className={`${style.button_wrapper}`}>
                <div className={`${style.btn} ${style.fourth}`} onClick={()=>{props.deleteNote(props.note)}}>
                   Delete
                </div>
            </div>
        </div>);
}

const mapStateToProps = (state) => {
    return {
        note:state.Note,
    };
};

const mapDispatchToProps = (dispatch) => ({
    saveNote: (data) => dispatch(saveNote(data)),
    updateNote: (data) => dispatch(updateNote(data)),
    deleteNote: (data) => dispatch(deleteNote(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ManagePanel);