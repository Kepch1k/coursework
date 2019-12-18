import React,{useState,useEffect} from 'react';
import style from './MainBody.module.scss';
import {getUserNotes} from "../../../actions/actionCreator";
import ManagePanel from '../ManagePanel/ManagePanel';
import connect from 'react-redux/es/connect/connect';

function MainBody(props) {

    const [selectedNote, setSelectedNote] = useState(
        null
    );

   // console.log(props.user.notes);

    useEffect(() => {
            if(props.user.user){
                if(!props.user.notes){
                    props.getUserNotes();
                }
            }
        return ()=>{
        }
    });

    let notesToRender=[];
    //2019-12-18T16:21:02.630Z
    const convertData = (e)=>{
        let newData = e.slice(0,4);
        newData +="."+e.slice(5,7);
        newData +="."+e.slice(8,10);
        newData +=" "+e.slice(11,13);
        newData +=":"+e.slice(14,16);
        newData +=":"+e.slice(17,19);
        return newData
    };
    if(props.user){
        if(props.user.notes){
            console.log( props.user.notes);

            notesToRender = props.user.notes.map((e)=>{
                return <li key={e.id} className={`${style.note} ${(e.id===selectedNote)?style.selected:""}`} onClick={()=>{setSelectedNote(e.id)}}>
                    <div><i className={`${style.symbolBeforeTitle} fas fa-bookmark`}/> {e.titleOfNote}</div> <div>{convertData(e.updatedAt)}</div>
                </li>
            });
            notesToRender.unshift(<li key={"title"} className={`${style.titleOfNote}`}>
                <div>Название Записи</div> <div>дата последнего обновления</div>
            </li>)
        }
    }


    return (
        <div className={`${style.mainBody}`}>
            <div className={`${style.title}`}>Ваш Список</div>
            <ul className={`${style.listOfNotes}`}>
                {(notesToRender.length===1)?"Пока что пусто":notesToRender}
            </ul>
            <ManagePanel selectedNote={selectedNote||null}/>
        </div>);
}

const mapStateToProps = (state) => {
    return {
        Nav:state.UI_Elements.Nav,
        Note: state.Note,
        user: state.userReducers,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getUserNotes: () => dispatch(getUserNotes()),
});

export default connect(mapStateToProps,mapDispatchToProps)(MainBody);