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
       "second",
       "first",
       "second",
       "third"
   ],

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

        default: {
            return state;
        }
    }
}
