import ACTION from '../actions/actiontsTypes';

const initialState = {
    msg: null,
    err: false,
    email: null,

};

export default function (state = initialState, action) {

    switch (action.type) {

        case ACTION.GET_MAIL_SERVICE_RESULT: {
            const email = (action.email) ? {email: action.email} : {};

            return {
                ...state,
                msg: action.result,
                err: action.err,
                ...email,
            };
        }
        case ACTION.CREATE_LINK_FOR_MAIL: {

            const email = (action.email) ? {email: action.email} : {};
            return {
                ...state,
                msg: action.result,
                err: action.err,
                ...email,
            };
        }
        case ACTION.RESET_API_MSG: {

            return {
                ...state,
                msg: null,
                err: false,
            };
        }
        default: {
            return state;
        }
    }
}
