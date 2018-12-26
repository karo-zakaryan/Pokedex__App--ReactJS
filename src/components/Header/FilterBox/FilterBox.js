import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const currencies = [
    {
        type: 'All Types',
    },
    {
        type: 'Fire',

    },
    {
        type: 'Water',

    },
    {
        type: 'Grass',

    },
];

class FilterBox extends Component {
    state = {
        type: 'All Types',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <TextField
                id="outlined-select-currency"
                select
                label="Filter By"
                className={classes.textField}
                value={this.state.type}
                onChange={this.handleChange('type')}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
                variant="outlined"
            >
                {currencies.map(option => (
                    <MenuItem key={option.type} value={option.type}>
                        {option.type}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}

const styles = theme => ({
    textField: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        background: "rgba(255, 255, 255, 0.15)",
        marginLeft: 0,
        width: '500px',
        height: "100%",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: '500px',
        },
        outline: 0,
        marginRight: theme.spacing.unit,
        "& label": {
            color: "#fff",
            "&:focus": {
                background: "primary",
            },
        },
        "& div": {
            color: "#fff",
            "&:focus": {
                background: "primary",
            }
        },
        "& .MuiFormLabel-root-96.MuiFormLabel-focused-97": {
            color: "#fff",
            outline: 0
        },
        "& .MuiSelect-select-104": {
            "&:focus": {
                background: 0,
            }
        },
        "& svg": {
            outline: 0
        }
    },
    menu: {
        marginTop: "-1%"
    }
});

export default withStyles(styles)(FilterBox);