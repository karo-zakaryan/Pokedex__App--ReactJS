import React, {Component} from 'react';
import {withStyles, MenuItem, TextField} from '@material-ui/core';
import {bindActionCreators} from "redux";
import {getPokemonByType} from "../../../redux/thunks/mainThunks";
import {refinePokemonByType, removePokemonListByType} from "../../../redux/actions/pkListRefineActions";
import {connect} from "react-redux";

const types = [
    {type: 'All Types', value: "All Types"},
    {type: 'Normal', value: "normal"},
    {type: 'Fighting', value: "fighting"},
    {type: 'Flying', value: "flying"},
    {type: 'Poison', value: "poison"},
    {type: 'Ground', value: "ground"},
    {type: 'Rock', value: "rock"},
    {type: 'Bug', value: "bug"},
    {type: 'Ghost', value: "ghost"},
    {type: 'Steel', value: "steel"},
    {type: 'Fire', value: "fire"},
    {type: 'Water', value: "water"},
    {type: 'Grass', value: "grass"},
    {type: 'Electric', value: "electric"},
    {type: 'Psychic', value: "psychic"},
    {type: 'Ice', value: "ice"},
    {type: 'Dragon', value: "dragon"},
    {type: 'Dark', value: "dark"},
    {type: 'Fairy', value: "fairy"},
];

class FilterBox extends Component {
    state = {
        type: 'All Types',
    };

    refinePokemon = type => {
        this.props.fetchPokemonByType(type).then(res => {
            this.props.refinePokemonByType({
                isRefineByPokemonType: true,
                type,
            });
        });
        this.props.removePokemonByType();
    };

    removeRefine = () => {
        this.props.refinePokemonByType({
            isRefineByPokemonType: false,
        });
    };

    handleChange = name => event => {
        if (event.target.value === 'All Types') {
            this.removeRefine();
        } else {
            this.removeRefine();
            this.refinePokemon(event.target.value);
        }
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;

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
                {types.map(option => (
                    <MenuItem key={option.value} value={option.value} name={option.type}>
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

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemonByType: bindActionCreators(getPokemonByType, dispatch),
        removePokemonByType: bindActionCreators(removePokemonListByType, dispatch),
        refinePokemonByType: bindActionCreators(refinePokemonByType, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(FilterBox));