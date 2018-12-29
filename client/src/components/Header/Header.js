import React, {Component} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    FormGroup,
    FormControlLabel,
    Switch,
    withStyles,
    Button,
    Popover
} from '@material-ui/core';
import SearchBox from "./SearchBox/SearchBox";
import FilterBox from "./FilterBox/FilterBox";
import {withRouter} from "react-router-dom";
import jwt_decode from "jwt-decode";

class Header extends Component {
    state = {
        auth: true,
        anchorEl: null,
        firstName: "",
        lastName: "",
        date: "",
        email: ""
    };

    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            firstName: decoded.first_name,
            lastName: decoded.last_name,
            email: decoded.email,
            date: decoded.created
        });
    }

    handleChange = e => {
        e.preventDefault();

        this.setState({auth: e.target.checked}, () => {
            localStorage.removeItem('usertoken');
            this.props.history.push("/");
        });
    };

    openProfileOver = e => {
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render() {
        const {classes} = this.props;
        const {auth, anchorEl, firstName, lastName, email, date} = this.state;
        const open = Boolean(anchorEl);

        return (
            <nav className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Button className={classes.button} variant="text" onClick={this.openProfileOver}>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Profile
                            </Typography>
                        </Button>
                        <Popover
                            id="profile-popper"
                            open={open}
                            anchorEl={anchorEl}
                            onClose={this.handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography>
                                First Name: <b>{firstName}</b>
                            </Typography>
                            <Typography>
                                Last Name: <b>{lastName}</b>
                            </Typography>
                            <Typography>
                                Email: <b>{email}</b>
                            </Typography>
                            <Typography>
                                Account Create Date: <b>{date}</b>
                            </Typography>
                        </Popover>
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
        fontSize: 18,
        textOverflow: "initial",
        textTransform: "initial",
        marginLeft: "2%",
    },
    logout: {
        width: "fit-content",
        "& div": {
            width: "fit-content",
        }
    },
    button: {
        "&:hover": {
            backgroundColor: "#2196f3"
        }
    }
});

export default withRouter(withStyles(styles)(Header));