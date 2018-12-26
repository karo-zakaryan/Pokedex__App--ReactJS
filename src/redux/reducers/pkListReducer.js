import actionTypes from "../actions/actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case actionTypes.APPEND_POKEMON:
            return {
                ...state,
                ...action.pokemon,
            };

        default:
            return state;
    }
}