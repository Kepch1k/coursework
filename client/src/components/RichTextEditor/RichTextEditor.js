import React from 'react';
import style from './RichTextEditor.module.scss';
import { Editor, EditorState, Modifier, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import "draft-js/dist/Draft.css";
import BlockStyleControls from './BlockStyleControls/BlockStyleControls';
import InlineStyleControls from './InlineStyleControls/InlineStyleControls';

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

    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    // the raw state, stringified
    const rawDraftContentState = JSON.stringify( convertToRaw(editorState.getCurrentContent()) );

   // console.log(rawDraftContentState);

// convert the raw state back to a useable ContentState object
    const contentState2 = convertFromRaw( JSON.parse( rawDraftContentState) );

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

        var selection = editorState.getSelection();
        var startKey = selection.getStartKey();
        var endKey = selection.getEndKey();
        var content = editorState.getCurrentContent();
        var target = selection; // Triple-click can lead to a selection that includes offset 0 of the
        // following block. The `SelectionState` for this case is accurate, but
        // we should avoid toggling block type for the trailing block because it
        // is a confusing interaction.

        if (startKey !== endKey && selection.getEndOffset() === 0) {
            var blockBefore = content.getBlockBefore(endKey);
            endKey = blockBefore.getKey();
            target = target.merge({
                anchorKey: startKey,
                anchorOffset: selection.getStartOffset(),
                focusKey: endKey,
                focusOffset: blockBefore.getLength(),
                isBackward: false
            });
        }

      console.log(target);
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
                    onChange={setEditorState}
                    onTab={onTab}
                    placeholder="write here"
                    ref={(input) => { RichTextEditorRef = input; }}
                    spellCheck={true}
                />
            </div>
        </div>
        );
}


//-----------------------------------------


//-----------------------------------------
export default RichTextEditor;
