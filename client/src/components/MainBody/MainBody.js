import React,{useState} from 'react';
import style from './MainBody.module.scss';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import ListOfTags from '../ListOfTags/ListOfTags';
import AddTagButton from './AddTagButton/AddTagButton';

function MainBody(props) {
    return (
        <div className={`${style.mainBody}`}>
            <div className={`${style.tags}`}>
                <ListOfTags/>
                <AddTagButton/>
            </div>
            <div className={`${style.textEditor}`}>
                <RichTextEditor/>
            </div>
            <div className={`${style.managePanel}`}>

            </div>
        </div>);
}

export default MainBody;