import React,{useState} from 'react';
import style from './RichTextEditor.module.scss';
import { Editor, EditorState, Modifier, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import connect from 'react-redux/es/connect/connect';
import "draft-js/dist/Draft.css";
import BlockStyleControls from './BlockStyleControls/BlockStyleControls';
import InlineStyleControls from './InlineStyleControls/InlineStyleControls';
import {setCurrentNote} from "../../actions/actionCreator";

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function RichTextEditor(props) {

    let RichTextEditorRef = null;

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );

    // const noteOnChange = () => {
    //     const rawDraftContentState = JSON.stringify( convertToRaw(editorState.getCurrentContent()) );
    //     props.setCurrentNote(rawDraftContentState);
    // };

    // the raw state, stringified


    //const contentState2 = convertFromRaw( JSON.parse( rawDraftContentState) );
   // this.props.setCurrentNote(rawDraftContentState);
   // console.log(rawDraftContentState);

// convert the raw state back to a useable ContentState object


   // console.log(contentState2);



    const editorState2= {...editorState};
    //console.log(editorState.getSelection(),RichUtils) ;

    const focus = () => RichTextEditorRef.focus();
    const handleKeyCommand = (command) => _handleKeyCommand(command);
    const onTab = (e) => _onTab(e);
    const toggleBlockType = (type) => _toggleBlockType(type);
    const toggleInlineStyle = (style) => _toggleInlineStyle(style);

    function _handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    }

    function _onTab(e) {
        const maxDepth = 4;
        setEditorState(RichUtils.onTab(e, editorState, maxDepth));
    }

    function _toggleBlockType(blockType) {
        setEditorState(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }

    function _toggleInlineStyle(inlineStyle) {
        setEditorState(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
    }

    function getBlockStyle(block) {
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return null;
        }
    }

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = style['RichEditor-editor'];
        let contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ` ${style[' RichEditor-hidePlaceholder']}`;
            }
        }

        return (
        <div className={`${style["RichEditor-root"]}`}>
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />
            <div className={`${className}`} onClick={focus}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={(e)=>{setEditorState(e);
                        const rawDraftContentState = JSON.stringify( convertToRaw(editorState.getCurrentContent()) );
                        props.setCurrentNote(rawDraftContentState);
                    }}
                    onTab={onTab}
                    placeholder="write here"
                    ref={(input) => { RichTextEditorRef = input; }}
                    spellCheck={true}
                />
            </div>
        </div>
        );
}
//onChange={setEditorState}

//-----------------------------------------

const mapStateToProps = (state) => {
    return {
        note:state.Note,
    };
};

const mapDispatchToProps = (dispatch) => ({
    setCurrentNote: (data) => dispatch(setCurrentNote(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(RichTextEditor);

//-----------------------------------------
//export default RichTextEditor;
