import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchBox from "./SearchBox/SearchBox";
import {withStyles} from '@material-ui/core/styles';
import FilterBox from "./FilterBox/FilterBox";
import FormGroup from "@material-ui/core/es/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {withRouter} from "react-router-dom";


class Header extends Component {
    state = {
        auth: true
    };

    handleChange = e => {
        e.preventDefault();

        this.setState({auth: e.target.checked}, () => {
            localStorage.removeItem('usertoken');
            this.props.history.push("/");
        });
    };

    render() {
        const {classes} = this.props;
        const {auth} = this.state;

        return (
            <nav className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            PokeDex
                        </Typography>
                        <FilterBox/>
                        <SearchBox/>
                        <div className={classes.logout}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch color="secondary" checked={auth} onChange={this.handleChange}
                                                aria-label="LoginSwitch"/>
                                    }
                                    label={auth ? 'Logout' : 'Login'}
                                />
                            </FormGroup>
                        </div>
                    </Toolbar>
                </AppBar>
            </nav>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        "&>header>div": {
            justifyContent: "space-between",
        }
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        fontSize: 25,
        marginLeft: "2%",
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    logout: {
        width: "fit-content",
        "& div": {
            width: "fit-content",
        }
    }
});

export default withRouter(withStyles(styles)(Header));