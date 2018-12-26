import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import PokeDexApp from './PokeDexApp';
import './index.css';

ReactDOM.render(<PokeDexApp />, document.getElementById('root'));

serviceWorker.unregister();