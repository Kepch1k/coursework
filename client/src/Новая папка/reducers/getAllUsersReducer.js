import ACTION from '../actions/actiontsTypes';

const initialState = {
    data: [],
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_ALL_USERS_REQUEST: {
            return {
                ...state,
                error: null,
            };
        }
        case ACTION.GET_ALL_USERS_SUCCESS: {
            return {
                ...state,
                data: action.data,
                error: null,
            };
        }
        case ACTION.GET_ALL_USERS_ERROR: {
            return {
                ...state,
                error: action.error,
            };
        }
        case ACTION.GET_ALL_USERS_UPDATE: {
            return {
                ...state,
                data: state.data.map(user => user.id === action.data.id ?
                    {...user, ...action.data} :
                    user
                ),
                error: null,
            };
        }
        default: {
            return state;
        }
    }
}


