import ACTION from '../actions/actiontsTypes';

const initialState = {
    needUpdate: {
        'userContests': false,
        'user': false,
    },
    msg: null,
    error: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CHANGE_APP_STATE: {

            const newState = action.data;
            return {
                ...state,
                needUpdate: {...state.needUpdate, ...newState}
            };
        }
        case ACTION.NEW_MESSAGE: {
            return {
                ...state,
                msg: action.msg,
                error: action.error
            };
        }
        case ACTION.RESET_APP_MSG: {
            return {
                ...state,
                msg: null,
                error: false
            };
        }

        default: {
            return state;
        }
    }
}