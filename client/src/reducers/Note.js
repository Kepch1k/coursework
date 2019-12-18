import ACTION from '../actions/actiontsTypes';

const initialState = {
    tags:[],
    currentNote:null,
    title:"Безымянный",
    state:"creating",
    id:null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CHANGE_CURRENT_TAGS: {
            return {
                ...state,
                tags:[
                    ...action.listOfTags
                ],
            };
        }

        case ACTION.SET_CURRENT_NOTE_TEXT: {
            return {
                ...state,
                currentNote:action.note,
            };
        }

        case ACTION.SET_NOTE: {
            console.log(action);
            return {
                ...state,
                ...action.note
            };
        }

        case ACTION.RESET_NOTE: {
            return {
                ...state,
                tags:[],
                currentNote:null,
                title:"Безымянный",
                state:"creating",
            };
        }

        case ACTION.RENAME_NOTE: {
            return {
                ...state,
                title:action.title,
            };
        }

        default: {
            return state;
        }
    }
}
