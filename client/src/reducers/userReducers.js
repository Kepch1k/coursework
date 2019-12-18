import ACTION from '../actions/actiontsTypes';
import {FIELD_FOR_CREATE_NOTE_TO_REPLACE} from "../utils/consts";

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
        case ACTION.ADD_NODE_TO_LIST: {
            return {
                ...state,
                notes:[...state.notes,action.note],
            };
        }

        case ACTION.DELETE_NODE_FROM_LIST: {
            return {
                ...state,
                notes:[...state.notes.filter((e)=>{return e.id!==action.note})],
            };
        }

        case ACTION.UPDATE_NODE_IN_LIST: {
            return {
                ...state,
                notes:[...state.notes.map((e)=>{
                    if (e.id===action.note.id){

                        return {
                            ...e,
                            ...action.note
                        };
                    }else{
                        return e;
                    }

                })],
            };
        }

        case ACTION.USER_LOGOUT: {
            return {
                ...state,
                user: null,
            };
        }


        default: {
            return state;
        }
    }
}
