import React,{useState} from 'react';
import style from './RichTextEditor.module.scss';
import { Editor, EditorState, Modifier, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import connect from 'react-redux/es/connect/connect';
import "draft-js/dist/Draft.css";
import BlockStyleControls from './BlockStyleControls/BlockStyleControls';
import InlineStyleControls from './InlineStyleControls/InlineStyleControls';
import {setCurrentNote} from "../../../actions/actionCreator";

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function RichTextEditor(props) {
    console.log("render")    ;
    let RichTextEditorRef = null;

   // console.log(convertFromRaw(JSON.parse(props.note.currentNote)));
    const [editorState, setEditorState] = useState(
        (props.note.currentNote)?EditorState.createWithContent(convertFromRaw(JSON.parse(props.note.currentNote))):EditorState.createEmpty()
    );

    // if(props.note.currentNote){
    //     setEditorState(convertFromRaw( JSON.parse( props.note.currentNote) ));
    // }

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
                    ref={(input) => { RichTextEditorRef = input; }}
                    spellCheck={true}
                />
            </div>
        </div>
        );
}
//onChange={setEditorState}  placeholder="write here"

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
