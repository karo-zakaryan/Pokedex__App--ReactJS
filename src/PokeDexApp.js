import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {getPokemon} from "./redux/thunks/mainThunks";
import {connect} from "react-redux";

class PokeDexApp extends Component {

    async componentDidMount() {
        try {
            await this.props.fetchPokemon();
        } catch (err) {
            console.log("Failed to fetch pokemon", err);
        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(PokeDexApp);