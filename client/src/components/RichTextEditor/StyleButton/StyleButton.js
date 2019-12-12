import React from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import style from './RichTextEditor.module.scss';

const StyleButton = (props) => {
    function onToggle(e){
        e.preventDefault();
        console.log(props.onToggle,props.style);
        props.onToggle(props.style);
    }

    let className = style['RichEditor-styleButton'];
    if (props.active) {
        className += ` ${style['RichEditor-activeButton']}`;
    }

    return (
        <span className={` ${className} `} onMouseDown={onToggle}>
              {props.label}
            </span>
    );
};

// class StyleButton extends React.Component {
//     constructor() {
//         super();
//         this.onToggle = (e) => {
//             e.preventDefault();
//             this.props.onToggle(this.props.style);
//         };
//     }
//
//     render() {
//         let className = style['RichEditor-styleButton'];
//         if (this.props.active) {
//             className += ` ${style['RichEditor-activeButton']}`;
//         }
//        // console.log("|",className,"|");
//         return (
//             <span className={` ${className} `} onMouseDown={this.onToggle}>
//               {this.props.label}
//             </span>
//         );
//     }
// }

export default StyleButton;