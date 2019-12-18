import React,{useState} from 'react';
import style from './ManagePanel.module.scss';
import connect from 'react-redux/es/connect/connect';
import {saveNote, updateNote, getUserNotes, addCommonNotification} from "../../../actions/actionCreator";
import history from "../../../boot/browserHistory";
import Message from "../../../utils/Message";

function ManagePanel(props) {
    const buttonToRender=(props.note.state==="creating")?
        <div className={`${style.button_wrapper}`}>
            <div className={`${style.btn} ${style.third}`} onClick={()=>{
                if(props.note.currentNote){
                    props.saveNote(props.note);
                    setTimeout(()=>{ history.push('/')},0);
                }else{
                    props.addCommonNotification(new Message("Запись не может быть пустой",4000,"error"));
                }
            }}>
                Сохранить
            </div>
        </div>
        :
        <div className={`${style.button_wrapper}`}>
            <div className={`${style.btn} ${style.fifth}`} onClick={()=>{
                if(props.note.currentNote){
                    props.updateNote(props.note);
                    setTimeout(()=>{ history.push('/')},0);
                }else{
                    props.addCommonNotification(new Message("Запись не может быть пустой",4000,"error"));
                }
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
    addCommonNotification: (data) => dispatch(addCommonNotification(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ManagePanel);