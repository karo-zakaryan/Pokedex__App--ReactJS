import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchBox from "./SearchBox/SearchBox";
import {withStyles} from '@material-ui/core/styles';
import FilterBox from "./FilterBox/FilterBox";

const Header = props => {
    const {classes} = props;

    return (
        <header>
            <nav className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            PokeDex
                        </Typography>
                        <div className={classes.grow}/>
                        <FilterBox/>
                        <div className={classes.grow}/>
                        <SearchBox/>
                    </Toolbar>
                </AppBar>
            </nav>
        </header>
    );
};

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
        width: "auto"
    },
    title: {
        fontSize: 25,
        marginLeft: "2%",
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
});

export default withStyles(styles)(Header);