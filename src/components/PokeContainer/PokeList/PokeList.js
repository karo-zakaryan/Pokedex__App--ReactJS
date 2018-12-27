import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPokemon} from "../../../redux/thunks/mainThunks";
import {withStyles} from '@material-ui/core/styles';
import PokeTable from "./PokeTable/PokeTable";

class PokeList extends Component {

    state = {
        pokemonListItems: [],
    };


    componentDidMount() {
        try {
            this.props.fetchPokemon();
        } catch (err) {
            console.log("Failed to fetch pokemon", err);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.pokemon !== this.props.pokemon) {
            this.setState({pokemonListItems: [...this.props.pokemon.results]});
        }
    }

    render() {
        const {classes} = this.props;
        const {pokemonListItems} = this.state;

        return (
            <div className={classes.root}>
                <PokeTable pokeList={pokemonListItems}/>
            </div>
        );
    }
}

const styles = () => ({
    root: {
        padding: "3%",
        "& div": {
            width: "auto",
            height: "auto"
        }
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemon: bindActionCreators(getPokemon, dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PokeList));