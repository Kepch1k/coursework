//import ACTION from '../actions/actiontsTypes';

const initialState = {
    "login/reg":{
        tab:"login",
    },
};

export default function (state = initialState, action) {
    /*switch (action.type) {
        case ACTION.SHOW_OR_HIDE_NAVIGATION: {
            const {show}=action;
            //console.log("show:",action.show,);
            return {
                ...state,
                Nav: {
                    ...state.Nav,
                    show,
                }
            };
        }
        default: {
            return state;
        }
    }*/
    return state;
}
