import ACTION from '../actions/actiontsTypes';
const _ = require("lodash");

const initialState = {
    common:{
        messages:[
            {
                text:"Test1",
                timer:6000,
                type:"success"
            },
            {
                text:"Test2",
                timer:8000,
                type:"error"
            },
            {
                text:"Test3",
                timer:10000,
                type:"warn"
            },
            {
                text:"Test4",
                timer:12000,
                type:"info"
            },
        ],
    },
    special:{
        messages:[],
    },
};

function deepEqual (obj1, obj2){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}

export default function (state = initialState, action) {
    switch (action.type) {

        case ACTION.ADD_COMMON_NOTIFICATION: {
            const newMessages=[...state.common.messages,action.message];
            return {
                ...state,
                common:{
                    messages:newMessages,
                }
            };
        }

        case ACTION.DELETE_COMMON_NOTIFICATION: {
            const newMessages = _.cloneDeep(state.common.messages);
            newMessages.splice(newMessages.indexOf(action.message), 1);
            return {
                ...state,
                common:{
                    messages:newMessages,
                }
            };
        }

        case ACTION.ADD_SPECIAL_NOTIFICATION: {
            const newMessages=[...state.special.messages,action.message];
            return {
                ...state,
                special:{
                    messages:newMessages,
                }
            };
        }

        case ACTION.DELETE_SPECIAL_NOTIFICATION: {
            const newMessages = _.cloneDeep(state.special.messages);
            newMessages.splice(newMessages.indexOf(action.message), 1);
            return {
                ...state,
                special:{
                    messages:newMessages,
                }
            };
        }

        default: {
            return state;
        }
    }
}