import React,{useState} from 'react';
import style from './ManagePanel.module.scss';
import connect from 'react-redux/es/connect/connect';
import {saveNote, updateNote, getUserNotes} from "../../../actions/actionCreator";
import history from "../../../boot/browserHistory";

function ManagePanel(props) {
    const buttonToRender=(props.note.state==="creating")?
        <div className={`${style.button_wrapper}`}>
            <div className={`${style.btn} ${style.third}`} onClick={()=>{
                props.saveNote(props.note);
                setTimeout(()=>{ history.push('/')},0);
            }}>
                Сохранить
            </div>
        </div>
        :
        <div className={`${style.button_wrapper}`}>
            <div className={`${style.btn} ${style.fifth}`} onClick={()=>{
                props.updateNote(props.note);
                setTimeout(()=>{ history.push('/')},0);
            }}>
                Обновить
            </div>
        </div>;
    return (
        <div className={`${style.managePanel}`}>
            {buttonToRender}
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
    getUserNotes: () => dispatch(getUserNotes()),
});

export default connect(mapStateToProps,mapDispatchToProps)(ManagePanel);