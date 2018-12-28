import actionTypes from "./actionTypes";

export const appendPokemonDetail = payload => {
    return {
        type: actionTypes.APPEND_POKEMON_DETAIL,
        pokemonDetail: payload
    };
};

export const removePokemonDetail = () => {
    return {
        type: actionTypes.REMOVE_POKEMON_DETAIL,
        pokemonDetail: {}
    };
};