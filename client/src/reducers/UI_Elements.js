import ACTION from '../actions/actiontsTypes';

const initialState = {
    Nav:{
        show:true,
        parameters:null,
        reAnimation:false,
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
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

        case ACTION.WRITE_HTML_PARAMETERS_FOR_ANIMATION: {
            return {
                ...state,
                Nav: {
                    ...state.Nav,
                    parameters:{
                        ...action.dataForAnimation,
                    }
                }
            };
        }

        case ACTION.DO_RE_ANIMATION: {
            return {
                ...state,
                Nav: {
                    ...state.Nav,
                    reAnimation:
                        action.do,
                }
            };
        }


        // case ACTION.SET_USER: {
        //
        //     console.log({
        //         navigation:document.getElementById("navigation").offsetWidth,
        //         controller:document.getElementById("controller").offsetWidth,
        //     });
        //
        //     return {
        //         ...state,
        //         Nav: {
        //             ...state.Nav,
        //             parameters:{
        //                    navigation:document.getElementById("navigation").offsetWidth,
        //                    controller:document.getElementById("controller").offsetWidth,
        //             }
        //         }
        //     };
        // }


        default: {
            return state;
        }
    }
}
