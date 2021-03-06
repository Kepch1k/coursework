import React,{useState} from 'react';
import style from './AddTagButton.module.scss';
import connect from 'react-redux/es/connect/connect';
import {changeCurrentTags, addCommonNotification, addSpecialNotification} from "../../../../actions/actionCreator";
import Message from "../../../../utils/Message";

function AddTagButton(props) {

    const checkValue = (value) => {
        let counter=0;
        const maxChars=20;
        for (let i=0 ; i< value.length; i++){
            if(value[i]!==" "){
                counter++;
            }
        }
        if(value.length > maxChars){
            props.addCommonNotification(new Message("Слишком много символов, используйте меньше чем 20 символов"));
        }
        return counter > 0 && value.length < maxChars;
    };

    const [addTagState, setAddTagState] = useState({
        button:true,
    });

    const [inputState, setInputState] = useState(null);

    return (
        <>
             {
              (addTagState.button)?<>
                    <button className={`${style.addButton}`} onClick={()=>{
                        if(props.note.tags.length<10){
                            setAddTagState({...addTagState,button: !addTagState.button});
                        }else{
                            props.addCommonNotification(new Message("Уже 10 тегов, больше нельзя"));
                        }
                    }}>
                        {" Добавить Тег "}
                    </button>
                    </>
                        :
                    <>
                        <input
                            className={`${style.addInput}`}
                            onChange={(event)=>setInputState(event.target.value)}
                        />
                        <button
                            className={`${style.addButton}`}
                            onClick={()=>{
                            setAddTagState({...addTagState,button: !addTagState.button});
                            if(inputState) {
                                if(checkValue(inputState)) {
                                props.changeCurrentTags([...props.note.tags, inputState]);
                                }
                            }
                        }}>
                            Подтвердить
                        </button>
                        <button
                            className={`${style.addButton}`} style={{borderColor:"red",width:"32px"}}
                            onClick={()=>{
                                setAddTagState({
                                    ...addTagState,
                                    button: !addTagState.button,
                                });

                            }}>
                        <i className="fas fa-times"/>
                        </button>
                    </>
                }
               </>
    );
}

const mapStateToProps = (state) => {
    return {
        note:state.Note,
    };
};

const mapDispatchToProps = (dispatch) => ({
    changeCurrentTags: (data) => dispatch(changeCurrentTags(data)),
    addCommonNotification: (data) => dispatch(addCommonNotification(data)),
    addSpecialNotification: (data) => dispatch(addSpecialNotification(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(AddTagButton);