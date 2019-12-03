import ACTION from '../actions/actiontsTypes';

const initialState = {
    selectedTags: {
        'id': null,
        'Active': false,
        'Closed': false,
        'Categories': "All Categories",
        'Industries': "All Industries",
    },
    confirmedContests: null,
    isFetching: false
};

export default function (state = initialState, action) {

    switch (action.type) {

        case ACTION.CHANGE_FILTER_TAGS: {
            return {
                ...state,
                selectedTags: {...state.selectedTags, ...action.data}
            };
        }
        case ACTION.SET_FILTERED_CONTEST: {
            return {
                ...state,
                confirmedContests: action.contests,
                isFetching: false
            };
        }
        case ACTION.FILTERED_CONTEST_REQUEST: {
            return {
                ...state,
                isFetching: true
            };
        }
        default: {
            return state;
        }
    }
}