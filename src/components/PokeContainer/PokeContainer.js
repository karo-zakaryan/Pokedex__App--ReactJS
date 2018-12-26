import React, {Component} from 'react';
import PokeList from "./PokeList/PokeList";
import PokeDetails from "./PokeDetails/PokeDetails";

class PokeContainer extends Component {
    render() {
        return (
            <main>
                <PokeList/>
                <PokeDetails/>
            </main>
        );
    }
}

export default PokeContainer;