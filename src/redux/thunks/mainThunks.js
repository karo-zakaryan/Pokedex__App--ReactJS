import API from "../../API";
import {appendPokemon} from "../actions/pkListActions";
import {appendPokemonDetail} from "../actions/pkDetailActions";

export const getPokemon = pokemon => dispatch => {
    API.get(`pokemon-form`).then(res => dispatch(appendPokemon(res.data)));
};

export const getPokemonDetail = pokemonId => dispatch => {
    API.get(`pokemon/${pokemonId}`).then(res => dispatch(appendPokemonDetail(res.data)));
};