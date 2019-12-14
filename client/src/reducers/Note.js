import ACTION from '../actions/actiontsTypes';

const initialState = {
   tags:[
       "first",
       "second",
       "first",
       "second",
       "first",
       "second",
       "first",
       "second",
       "first",
   ],
    currentNote:null,
    title:"Тестовое Название",

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
            };
        }

        default: {
            return state;
        }
    }
}
