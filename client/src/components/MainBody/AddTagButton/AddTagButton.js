import React,{useState} from 'react';
import style from './AddTagButton.module.scss';
import connect from 'react-redux/es/connect/connect';
import {changeCurrentTags} from "../../../actions/actionCreator";



function AddTagButton(props) {

    const checkValue = (value) => {
        let counter=0;
        const maxChars=50;
        for (let i=0 ; i< value.length; i++){
            if(value[i]!==" "){
                counter++;
            }
        }
        if(value.length > maxChars){
            setAddTagState({
                ...addTagState,
                error:"Too much chars. Use less than 50 chars",
            });
        }
        return counter > 0 && value.length < maxChars;
    };

    const [addTagState, setAddTagState] = useState({
        button:true,
        errorVerify:null,
        errorToAdd:null,
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
                            setAddTagState({
                                ...addTagState,
                                errorToAdd:"Already 10 tags. No more.",
                            });
                            setTimeout(()=>{
                                setAddTagState({
                                    ...addTagState,
                                    errorToAdd:null,
                                });
                            },3000);
                        }
                    }}>
                        {" Добавить Тэг "}
                    </button>
                    {addTagState.errorToAdd && <span className={`${style.errorMsg}`}>{ addTagState.errorToAdd }</span>}
                    </>
                        :
                    <>
                        <input
                            className={`${style.addInput}`}
                            onChange={(event)=>setInputState(event.target.value)}
                        />
                        {addTagState.errorVerify && <span className={`${style.errorMsg}`}>{ addTagState.errorVerify }</span>}
                        <button
                            className={`${style.addButton}`}
                            onClick={()=>{
                            setAddTagState({...addTagState,button: !addTagState.button});
                            console.log(inputState);
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
                                    errorVerify:null,
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
});

export default connect(mapStateToProps,mapDispatchToProps)(AddTagButton);