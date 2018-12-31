import React, {Component} from "react";
import isEmail from 'validator/lib/isEmail';
import {Link, withRouter} from "react-router-dom";
import routePaths from "../../constKeys/routePaths";
import {Button, CssBaseline, FormControl, Paper, Typography, withStyles, TextField} from '@material-ui/core';
import UserManager from "../../managers/UserManager/UserManager";
import DataManager from "../../managers/DataManager/DataManager";
import {GoogleLogin} from "react-google-login";
import FontAwesome from "react-fontawesome";

let pass;

class SignUpForm extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: "",
        password: "",
        confPassword: "",
        disabled: true,
        formErrors: {
            first_name: '',
            last_name: '',
            email: "",
            password: "",
            confPassword: "",
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

        const {formErrors, password, first_name, confPassword, last_name, email} = this.state;
        const {name, value} = e.target;

        switch (name) {
            case "first_name":
                formErrors.first_name =
                    DataManager.testName(value) && value.length >= 3
                        ? ""
                        : "Minimum 3 characters required. Allowed only letters and numbers";
                break;
            case "last_name":
                formErrors.last_name =
                    DataManager.testName(value) && value.length >= 3
                        ? ""
                        : "Minimum 3 characters required. Allowed only letters and numbers";
                break;
            case "email":
                formErrors.email = isEmail(value)
                    ? ""
                    : "Invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "Minimum 6 characters required" : "";
                pass = value;

                break;
            case "confPassword":
                formErrors.confPassword =
                    pass !== value
                        ? "Your password and confirmation password do not match"
                        : "";
                break;
            default:
                break;
        }

        this.setState({
            formErrors,
            [name]: value,
            disabled:
                (formErrors.email || !email) ||
                (formErrors.password || !password) ||
                (formErrors.first_name || !first_name) ||
                (formErrors.last_name || !last_name) ||
                (formErrors.confPassword || !confPassword)
        });
    };

    signUp = e => {
        e.preventDefault();
        const {email, password, last_name, first_name, formErrors} = this.state;

        const user = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        };

        UserManager.register(user).then(res => {
            this.props.history.push(routePaths.signIn);
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
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-first_name-input"
                                label="First Name"
                                className={formErrors.first_name.length > 0 ? classes.error__input : null}
                                onChange={this.handleChange}
                                type="text"
                                name="first_name"
                                autoComplete="first_name"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.first_name.length > 0 && (
                                <span className={classes.error__input}>{formErrors.first_name}</span>
                            )}
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-last_name-input"
                                label="Last Name"
                                className={formErrors.last_name.length > 0 ? classes.error__input : null}
                                onChange={this.handleChange}
                                type="text"
                                name="last_name"
                                autoComplete="last_name"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.last_name.length > 0 && (
                                <span className={classes.error__input}>{formErrors.last_name}</span>
                            )}
                        </FormControl>

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

                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-confPassword-input"
                                label="Confirm Password"
                                className={formErrors.confPassword.length > 0 ? classes.error__input : null}
                                onChange={this.handleChange}
                                type="password"
                                name="confPassword"
                                autoComplete="confirm-password"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.confPassword.length > 0 && (
                                <span className={classes.error__input}>{formErrors.confPassword}</span>
                            )}
                        </FormControl>

                        {formErrors.loginError.length > 0 && (
                            <span className={classes.error__input}>{formErrors.loginError}</span>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={`${classes.submit} ${classes.blue}`}
                            onClick={this.signUp}
                            disabled={!!disabled}

                        >
                            Sign up
                        </Button>
                        <GoogleLogin
                            clientId="1061445041073-c4r5u0bgudae2noedn2knqjrcr99im21.apps.googleusercontent.com"
                            onSuccess={this.googleResponse}
                            onFailure={this.onFailure}
                            prompt="select_account"
                            className={classes.submit}
                        >
                            <FontAwesome name="google"/>
                            <span>Sign up with Google</span>
                        </GoogleLogin>
                        <Link className={classes.aLink} to={routePaths.signIn}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Sign in
                            </Button>
                        </Link>
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

export default withRouter(withStyles(styles)(SignUpForm));