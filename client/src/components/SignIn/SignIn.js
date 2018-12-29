import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import routePaths from "../../constKeys/routePaths";
import isEmail from "validator/lib/isEmail";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import UserManager from "../../managers/UserManager/UserManager";

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            disabled: true,
            formErrors: {
                email: "",
                password: "",
                loginError: ""
            }
        };
    }

    handleChange = e => {
        e.preventDefault();

        const {name, value} = e.target;
        let {formErrors} = this.state;

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
            disabled:
                formErrors.email ||
                !this.state.email ||
                (formErrors.password || !this.state.password)
        });
    };

    login = e => {
        e.preventDefault();

        const {history} = this.props;
        const {email, password} = this.state;
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
            console.error(this.state.formErrors.loginError);
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
                        <Link to={routePaths.signUp}>
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
        marginTop: theme.spacing.unit * 3,
    },
    blue: {
        backgroundColor: '#04a9f5',
        color: '#fff'
    },
    error__input: {
        fontSize: 12,
        color: "red",
        display: "block",
    }
});

export default withRouter(withStyles(styles)(SignInForm));