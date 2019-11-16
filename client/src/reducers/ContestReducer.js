import ACTION from '../actions/actiontsTypes';

const initialState = {
    contest: null,
    entries: null,
    isFetching: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION.CONTESTS_BY_ID_RESPONSE: {
            return {
                ...state,
                isFetching: false,
                contest: action.contest,
                entries: action.entries
            };
        }
        case ACTION.CONTESTS_BY_ID_REQUEST: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case ACTION.CONTEST_UPDATE: {
            return {
                ...state,
                contest: action.contest
            };
        }
        case ACTION.ENTRY_UPDATE: {
            return {
                ...state,
                entries: action.entry
            };
        }
        case ACTION.CHOOSE_WINNER: {
            const newEntries = state.entries.map((item) => {
                if (action.entry.id === item.id) {
                    return action.entry
                } else {
                    return item
                }
            });
            return {
                ...state,
                entries: newEntries
            };
        }
        default: {
            return state;
        }
    }
}