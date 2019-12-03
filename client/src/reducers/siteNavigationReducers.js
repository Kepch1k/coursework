import ACTION from '../actions/actiontsTypes';

const initialState = {
    pageToRedirect: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.SITE_NAVIGATION: {
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