import React,{useState} from 'react';
import style from './ManagePanel.module.scss';
import connect from 'react-redux/es/connect/connect';
import {createNote, changeNote, deleteNote, addCommonNotification} from "../../../actions/actionCreator";
import Message from "../../../utils/Message";
import history from "../../../boot/browserHistory";
const _ = require("lodash");

function ManagePanel(props) {
//console.log(props.selectedNote);
    return (
        <div className={`${style.managePanel}`}>
            <div className={`${style.button_wrapper}`}>
                <div className={`${style.btn} ${style.third}`} onClick={()=>{
                        props.createNote(props.selectedNote);
                        history.push('/note/');
                }}>
                   Создать
                </div>
            </div>
            <div className={`${style.button_wrapper}`}>
                <div className={`${style.btn} ${style.fifth}`} onClick={()=>{
                    if(props.selectedNote){
                        let neededNote;
                            props.user.notes.forEach((e)=>{
                            if(props.selectedNote===e.id){
                                neededNote = _.omit(e,["titleOfNote"]);
                            }
                        });
                            console.log(neededNote);
                        props.changeNote(neededNote);
                        setTimeout(()=>{ history.push('/note/')},0);
                    }else {
                        props.addCommonNotification(new Message("Сначала выберите запись"));
                    }
                }}>
                   Изменить
                </div>
            </div>
            <div className={`${style.button_wrapper}`}>
                <div className={`${style.btn} ${style.fourth}`} onClick={()=>{
                    if(props.selectedNote){
                        props.deleteNote(props.selectedNote);
                    }else {
                        props.addCommonNotification(new Message("Сначала выберите запись"));
                    }
                }}>
                   Удалить
                </div>
            </div>
        </div>);
}

const mapStateToProps = (state) => {
    return {
        note:state.Note,
        user:state.userReducers,
    };
};

const mapDispatchToProps = (dispatch) => ({
    createNote: (data) => dispatch(createNote(data)),
    changeNote: (data) => dispatch(changeNote(data)),
    deleteNote: (data) => dispatch(deleteNote(data)),
    addCommonNotification: (data) => dispatch(addCommonNotification(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ManagePanel);