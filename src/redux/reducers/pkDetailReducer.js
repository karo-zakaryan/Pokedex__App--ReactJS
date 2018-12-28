import actionTypes from "../actions/actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case actionTypes.APPEND_POKEMON_DETAIL:
            return {
                ...state,
                ...action.pokemonDetail,
            };
        case actionTypes.REMOVE_POKEMON_DETAIL:
            return action.pokemonDetail;

        default:
            return state;
    }
}