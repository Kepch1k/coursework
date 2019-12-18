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

    let notesToRender=null;

    if(props.user){
        if(props.user.notes){
            console.log( props.user.notes);
            notesToRender = props.user.notes.map((e)=>{
                return <li key={e.id} className={`${style.note} ${(e.id===selectedNote)?style.selected:""}`} onClick={()=>{setSelectedNote(e.id)}}>
                    {e.titleOfNote}
                </li>
            });
        }
    }


    return (
        <div className={`${style.mainBody}`}>
            <ul className={`${style.listOfNotes}`}>
                {notesToRender||""}
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