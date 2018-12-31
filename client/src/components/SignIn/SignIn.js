import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import routePaths from "../../constKeys/routePaths";
import isEmail from "validator/lib/isEmail";
import {Button, CssBaseline, FormControl, Paper, Typography, TextField, withStyles} from '@material-ui/core';
import UserManager from "../../managers/UserManager/UserManager";
import {GoogleLogin} from 'react-google-login';

class SignInForm extends Component {
    state = {
        email: "",
        password: "",
        disabled: true,
        formErrors: {
            email: "",
            password: "",
            loginError: ""
        }
    };

    googleResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type: 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default',
            proxy: {
                host: "localhost",
                port: 5000
            }
        };
        fetch('http://localhost:5000/auth/google', options).then(r => {
            if (r.ok) {
                const token = r.headers.get('x-auth-token');
                const res = r.json();
                res.then(user => {
                    if (token) {
                        localStorage.setItem('usertoken', token);
                        this.props.history.push(routePaths.pokemonPage);
                    }
                });
            }
        })
    };

    onFailure = (error) => {
        console.error(error);
    };


    handleChange = e => {
        e.preventDefault();

        const {name, value} = e.target;
        const {formErrors, email, password} = this.state;

        switch (name) {
            case "email":
                formErrors.email = isEmail(value)
                    ? ""
                    : "Invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "Minimum 6 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({
            formErrors,
            [name]: value,
            disabled: (formErrors.email || !email) || (formErrors.password || !password)
        });
    };

    login = e => {
        e.preventDefault();

        const {history} = this.props;
        const {email, password, formErrors} = this.state;
        const user = {
            email: email,
            password: password
        };

        UserManager.login(user).then(res => {
            if (res) {
                history.push(routePaths.pokemonPage);
            }
        }).catch(error => {
            this.setState(prevState => ({
                formErrors: {
                    ...prevState.formErrors,
                    loginError: error
                }
            }));
            console.error(formErrors.loginError);
        });
    };

    render() {
        const {formErrors, disabled} = this.state;
        const {classes} = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                className={formErrors.email.length > 0 ? classes.error__input : null}
                                onChange={this.handleChange}
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.email.length > 0 && (
                                <span className={classes.error__input}>{formErrors.email}</span>
                            )}
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                className={formErrors.password.length > 0 ? classes.error__input : null}
                                onChange={this.handleChange}
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.password.length > 0 && (
                                <span className={classes.error__input}>{formErrors.password}</span>
                            )}
                        </FormControl>
                        {formErrors.loginError.length > 0 && (
                            <span className={classes.error__input}>{formErrors.loginError}</span>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={`${classes.submit} ${classes.blue}`}
                            onClick={this.login}
                            disabled={!!disabled}
                        >
                            Sign in
                        </Button>
                        <Link className={classes.aLink} to={routePaths.signUp}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Sign up
                            </Button>
                        </Link>
                        <GoogleLogin
                            clientId="1061445041073-c4r5u0bgudae2noedn2knqjrcr99im21.apps.googleusercontent.com"
                            onSuccess={this.googleResponse}
                            onFailure={this.onFailure}
                            prompt="select_account"
                            buttonText="Sign in with Google"
                            className={classes.submit}
                        />
                    </form>
                </Paper>
            </main>
        );
    }
}

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        height: '100vh',
        position: 'relative',
    },
    paper: {
        width: '500px',
        height: "fit-content",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 24px 60px 24px',
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        height: '40px',
        display: "flex",
        width: "-webkit-fill-available",
        justifyContent: "center",
        marginTop: theme.spacing.unit * 3,
        outline: 0,
        "& div": {
            width: "auto",
            height: 37
        },
        "& span": {
            fontSize: "0.875rem"
        }
    },
    blue: {
        backgroundColor: '#04a9f5',
        color: '#fff'
    },
    error__input: {
        fontSize: 12,
        color: "red",
        display: "block",
    },
    aLink: {
        textDecoration: "none"
    }
});

export default withRouter(withStyles(styles)(SignInForm));