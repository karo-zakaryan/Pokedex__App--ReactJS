import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPokemon} from "../../../redux/thunks/mainThunks";
import {withStyles} from '@material-ui/core/styles';
import PokeTable from "./PokeTable/PokeTable";
import {RiseLoader} from "react-spinners";

class PokeList extends Component {

    state = {
        pokemonListItems: null,
        pokemonRefineItems: null,
    };

    handleSearch = (list, refine) => {
        return list.filter(poke => {
            const name = refine ? poke.pokemon.name : poke.name;
            return name.toLowerCase().includes(this.props.searchQuery);
        });
    };

    componentDidMount() {
        try {
            this.props.fetchPokemon();
        } catch (err) {
            console.log("Failed to fetch pokemon", err);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {pokemon, searchQuery, pokeRefineList, pokeRefine} = this.props;
        if (prevProps.pokeRefineList !== pokeRefineList
            || prevProps.searchQuery !== searchQuery
            || prevProps.pokemon !== pokemon
            || prevProps.pokeRefine !== pokeRefine) {
            const searchPokeList = (searchQuery !== "")
                ? this.handleSearch(pokemon.results, false)
                : pokemon.results;
            const searchRefineList = (searchQuery !== "" && pokeRefine.isRefineByPokemonType)
                ? this.handleSearch(pokeRefineList, true)
                : pokeRefineList;
            this.setState({
                pokemonListItems: searchPokeList,
                pokemonRefineItems: searchRefineList
            });
        }
    }

    render() {
        const {classes, pokeRefine} = this.props;
        const {pokemonListItems, pokemonRefineItems} = this.state;

        return (
            <div className={classes.root}>
                {pokemonListItems
                    ? <PokeTable
                        pokeList={pokemonListItems}
                        pokeRefineList={pokemonRefineItems}
                        pokeRefine={pokeRefine.isRefineByPokemonType}/>
                    : <RiseLoader className="loader" size={90} margin="30"/>
                }
            </div>
        );
    }
}

const styles = () => ({
    root: {
        padding: "3%",
        "& .table": {
            width: "auto",
            height: "auto"
        },
        "& .loader": {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10%",
            "& div": {
                backgroundColor: "#e91e63"
            }
        },
    },
    list: {
        flexGrow: 1,
        "& div": {
            justifyContent: "center"
        }
    },
    ul: {
        display: "flex",
        justifyContent: "space-evenly"
    }
});

const mapStateToProps = state => {
    return {
        pokemon: state.pkList,
        pokeRefine: state.pkRefine,
        pokeRefineList: state.pkListType.pokemon,
        searchQuery: state.pkSearchQuery
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemon: bindActionCreators(getPokemon, dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PokeList));