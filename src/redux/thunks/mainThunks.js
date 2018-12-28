import API from "../../API";
import {appendPokemon} from "../actions/pkListActions";
import {appendPokemonDetail} from "../actions/pkDetailActions";
import {appendPokemonByType} from "../actions/pkListRefineActions";

export const getPokemon = pokemon => dispatch => {
    API.get(`pokemon-form`).then(res => dispatch(appendPokemon(res.data)));
};

export const getPokemonDetail = pokemonId => dispatch => {
    API.get(`pokemon/${pokemonId}`).then(res => dispatch(appendPokemonDetail(res.data)));
};

export const getPokemonByType = type => dispatch => {
    return new Promise(
         (resolve, reject) => {
            API.get(`type/${type}/`).then(res => {
                resolve(dispatch(appendPokemonByType(res.data)));
            }).catch(err => {
                reject(err);
            })
    });
};