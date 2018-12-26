import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import PokeDexApp from './PokeDexApp';
import {Provider} from "react-redux"
import {store} from "./redux/store";
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <PokeDexApp/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();