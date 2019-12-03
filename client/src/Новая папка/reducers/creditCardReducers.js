import ACTION from '../actions/actiontsTypes';

const initialState = {
    isFetching: false,
    resultTransaction: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.SEND_CARD_REQUISITES_REQUEST: {

            return {
                ...state,
                isFetching: true,
                resultTransaction: null,
            };
        }
        case ACTION.SEND_CARD_REQUISITES_RESULT: {

            return {
                ...state,
                isFetching: false,
                resultTransaction: action.data
            };
        }
        case ACTION.RESET_CARD_RESULT: {

            return {
                ...state,
                resultTransaction: null
            };
        }
        default: {
            return state;
        }
    }
}