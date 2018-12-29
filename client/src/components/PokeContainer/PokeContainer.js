import React, {Component} from 'react';
import PokeList from "./PokeList/PokeList";
import {withStyles} from "@material-ui/styles";

class PokeContainer extends Component {
    render() {
        const {classes} = this.props;
        return (
            <main className={classes.root}>
                <PokeList/>
            </main>
        );
    }
}

const styles = () => ({
    root: {
        display: "flex",
        justifyContent: "center",
        marginTop: "5%"
    }
});

export default withStyles(styles)(PokeContainer);