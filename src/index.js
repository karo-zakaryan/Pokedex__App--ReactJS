import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import PokeDexApp from './PokeDexApp';
import {Provider} from "react-redux"
import {store} from "./redux/store";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './index.css';

const theme = createMuiTheme({
    palette: {
        primary: {main: "#2196f3"},
        secondary: {main: '#3f51b5'},
    },
    typography: {useNextVariants: true},
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <PokeDexApp/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();