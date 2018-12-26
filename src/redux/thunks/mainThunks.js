import API from "../../API";
import {appendPokemon} from "../actions/pkListActions";

export const getPokemon = pokemon => dispatch => {
    API.get(`pokemon-form`).then(res => dispatch(appendPokemon(res.data)));
};