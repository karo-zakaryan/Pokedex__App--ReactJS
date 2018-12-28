import actionTypes from "../actions/actionTypes";

export default function (state = "", action) {
    switch (action.type) {
        case actionTypes.SEARCH_NAME_QUERY:
            return action.query;

        default:
            return state;
    }
}