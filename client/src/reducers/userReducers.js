import ACTION from '../actions/actiontsTypes';

const initialState = {
    data: {},
    isFetching: true,
    error: null,
    loginFailed: false,
    user: null,
    updated: false,
    banned: false,
    notes:null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.LOGIN_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
                banned: false,
                loginFailed: false,
                updated: false,
            };
        }
        case ACTION.NO_USER: {
            return {
                ...state,
                isFetching: false,
                loginFailed: false
            };
        }
        case ACTION.SET_USER: {
            return {
                ...state,
                banned: false,
                user: action.user,
                loginFailed: false,
                isFetching: false,
            };
        }
        case ACTION.GET_USER: {
            return {
                ...state,
                isFetching: true,
                loginFailed: false
            };
        }
        case ACTION.IS_LOGIN_ERROR: {
            return {
                ...state,
                banned: false,
                error: action.error,
                isFetching: false,
                loginFailed: true,
            };
        }
        case ACTION.SET_USER_NOTES: {
            return {
                ...state,
               notes:action.notes,
            };
        }


        default: {
            return state;
        }
    }
}
