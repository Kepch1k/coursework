import React,{useState,useRef, useEffect} from 'react';
import style from './MainBody.module.scss';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import ListOfTags from '../ListOfTags/ListOfTags';
import AddTagButton from './AddTagButton/AddTagButton';
import ManagePanel from '../ManagePanel/ManagePanel';
import {showingOrHidingNavigation, writeHtml, renameNote} from "../../../actions/actionCreator";
import connect from 'react-redux/es/connect/connect';

function MainBody(props) {
    const [isReNameTitle, setIsReNameTitle] = useState(
        false
    );
    const [title, setTitle] = useState(
        props.Note.title
    );
    return (
        <div className={`${style.mainBody}`}>
            <div className={`${style.title_wrapper}`}>
                    {(isReNameTitle)?<input className={`${style.inputTitle}`} type={'text'} name={"title"}
                                            onChange={(e)=>{e.preventDefault();setTitle(e.target.value);}}
                                            onBlur={(e)=>{e.preventDefault();setIsReNameTitle(false);props.renameNote(title);}}
                                            onMouseOver={(e)=>{e.target.focus();}}
                                            value={title}/>
                    :
                    <div className={`${style.title}`} onClick={()=>{setIsReNameTitle(true);}}>{props.Note.title}</div>}
            </div>
            <div className={`${style.tags}`}>
                <ListOfTags/>
                <AddTagButton/>
            </div>
            <div className={`${style.textEditor}`}>
                <RichTextEditor/>
            </div>
            <div className={`${style.managePanel}`}>
                <ManagePanel/>
            </div>
        </div>);
}

const mapStateToProps = (state) => {
    return {
        Nav:state.UI_Elements.Nav,
        Note: state.Note,
    };
};

const mapDispatchToProps = (dispatch) => ({
    showingOrHidingNavigation: (data) => dispatch(showingOrHidingNavigation(data)),
    writeHtml: (data) => dispatch(writeHtml(data)),
    renameNote: (data) => dispatch(renameNote(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(MainBody);