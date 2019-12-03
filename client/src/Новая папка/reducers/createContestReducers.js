import ACTION from '../actions/actiontsTypes';

const initialState = {
    selectedContestTypes: [],
    contestStage: 1,
    amountOfStages: 1,
    currentContestForm: null,
    tempContests: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.SELECTED_CONTEST_TYPE: {

            return {
                ...state,
                selectedContestTypes: action.contestTypes,
                amountOfStages: (action.contestTypes.length) ? action.contestTypes.length + 2 : 1
            };
        }
        case ACTION.CONTEST_PROGRESSING: {

            return {
                ...state,
                contestStage: action.stage,
                currentContestForm: action.form
            };
        }
        case ACTION.TEMP_CONTEST: {

            const field = action['data']['typeOfContest'];
            const oldTempContests = state.tempContests;
            return {
                ...state,
                tempContests: {
                    ...oldTempContests,
                    [field]: action.data
                },
            };
        }
        case ACTION.RESET_TEMP_CONTEST: {

            return {
                ...state,
                tempContests: {},
            };
        }
        default: {
            return state;
        }
    }
}