import React,{useState} from 'react';
import style from './MainBody.module.scss';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import ListOfTags from '../ListOfTags/ListOfTags';
import AddTagButton from './AddTagButton/AddTagButton';
import ManagePanel from '../ManagePanel/ManagePanel';
import {showingOrHidingNavigation, writeHtml} from "../../../actions/actionCreator";
import connect from 'react-redux/es/connect/connect';

function MainBody(props) {
    return (
        <div className={`${style.mainBody}`}>
            <div className={`${style.title_wrapper}`}>
                <div className={`${style.title}`}>
                    {props.Note.title||"Название"}
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

const mapStateToProps = (state) => {
    return {
        Nav:state.UI_Elements.Nav,
        Note: state.Note,
    };
};

const mapDispatchToProps = (dispatch) => ({
    showingOrHidingNavigation: (data) => dispatch(showingOrHidingNavigation(data)),
    writeHtml: (data) => dispatch(writeHtml(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(MainBody);