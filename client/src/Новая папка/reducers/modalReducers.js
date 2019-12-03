import ACTION from '../actions/actiontsTypes';

const initialState = {
    confirmEmail: false,
    resetPassword: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.MODAL_STATE: {
            return {
                ...state,
                ...action.data
            };
        }
        default: {
            return state;
        }
    }
}