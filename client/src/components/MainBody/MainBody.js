import React,{useState} from 'react';
import style from './MainBody.module.scss';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import ListOfTags from '../ListOfTags/ListOfTags';
import AddTagButton from './AddTagButton/AddTagButton';
import ManagePanel from '../ManagePanel/ManagePanel';


function MainBody(props) {
    return (
        <div className={`${style.mainBody}`}>
            <div className={`${style.title_wrapper}`}>
                <div className={`${style.title}`}>
                    TITLE
                </div>
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

export default MainBody;