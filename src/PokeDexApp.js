import React, {Component} from 'react';
import Header from "./components/Header/Header";
import PokeContainer from "./components/PokeContainer/PokeContainer";

class PokeDexApp extends Component {
    render() {
        return (
            <div>
                <Header/>
                <PokeContainer/>
            </div>
        );
    }
}

export default PokeDexApp;