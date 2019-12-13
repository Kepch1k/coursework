import React,{useState} from 'react';
import style from './ListOfTags.module.scss';
import Tag from './Tag/Tag';
import connect from 'react-redux/es/connect/connect';
import {changeCurrentTags} from "../../actions/actionCreator";

function ListOfTags(props) {

    const tagsToRender =  props.note.tags.map((e,id)=>{
        return<Tag value={e} onClicked={()=>deleteTag(id)} key={id}/>
    });

    const deleteTag = (tagId)=> {
        props.note.tags.splice(tagId,1);
        props.changeCurrentTags(props.note.tags);
    };

    return (
        <div className={`${style.listOfTags}`}>
            {tagsToRender}
        </div>);
}

const mapStateToProps = (state) => {
    return {
        note:state.Note,
    };
};

const mapDispatchToProps = (dispatch) => ({
    changeCurrentTags: (data) => dispatch(changeCurrentTags(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ListOfTags);