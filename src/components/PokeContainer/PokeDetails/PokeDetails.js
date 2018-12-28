import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {getPokemonDetail} from "../../../redux/thunks/mainThunks";
import connect from "react-redux/es/connect/connect";
import {Modal, TableCell, TableRow, withStyles} from "@material-ui/core";
import {removePokemonDetail} from "../../../redux/actions/pkDetailActions";
import noImage from "../../../assets/no__img.png";
import Button from "@material-ui/core/Button";
import PokeDetail from "./PokeDetail/PokeDetail";

class PokeDetails extends Component {
    state = {
        show: false
    };

    handleOpen = () => {
        this.setState({show: true});
    };

    handleClose = () => {
        const {pokemonId, removePokemonDetail} = this.props;
        this.setState({show: false});
        if (pokemonId > 950) return;
        removePokemonDetail();
    };

    addDefaultSrc = e => {
        e.target.src = noImage;
    };

    handleClick = pokeId => {
        this.handleOpen();

        try {
            if (pokeId > 950) return;
            this.props.fetchPokemonDetail(pokeId);
        } catch (err) {
            console.log("Failed to fetch pokemon", err);
        }
    };

    render() {
        const {classes, pokemonId, pokemonName, pokemonImg, pokemonDetail} = this.props;
        const {show} = this.state;

        return (
            <>
                <TableRow
                    hover
                    onClick={() => this.handleClick(pokemonId)}
                    tabIndex={-1}>
                    <TableCell align="left">
                        <img
                            alt="sprite"
                            src={pokemonImg}
                            onError={this.addDefaultSrc}
                        />
                        {pokemonId}
                    </TableCell>
                    <TableCell>
                        {pokemonName}
                    </TableCell>
                </TableRow>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    tabIndex={-1}
                    open={show}
                >
                    <div className={classes.root}>
                        <PokeDetail
                            sprites={pokemonDetail.sprites}
                            name={pokemonDetail.name}
                            id={pokemonDetail.id}
                            baseExp={pokemonDetail.base_experience}
                            types={pokemonDetail.types}
                            species={pokemonDetail.species}
                            height={pokemonDetail.height}
                            weight={pokemonDetail.weight}
                            abilities={pokemonDetail.abilities}
                            stats={pokemonDetail.stats}
                        />
                        <Button className={classes.modal__close__btn} onClick={this.handleClose}>x</Button>
                    </div>
                </Modal>
            </>
        );
    }
}

const styles = theme => ({
    root: {
        position: 'fixed',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        width: "calc(100% - 700px)",
        minHeight: 500,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 50,
        alignItems: "flex-end",
        justifyContent: "space-between",
        outline: 0,
        "& .data__wrapper": {
            display: "flex",
            alignItems: "baseline",
            "&>div": {
                width: 150,
                height: 150,
            },
            "& .data__wr": {
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                flexDirection: "column",
                "& th": {
                    fontSize: 18
                }
            },
            "& .pie__chart": {
                position: "absolute",
                top: "45%",
                width: "100%",
                height: "100%",
                right: "-5%",
                "& .pie__chart__loader": {
                    position: "absolute",
                    top: "60%"
                },
                "& text": {
                    fill: "#0e0e0e",
                    fontSize: 14,
                    textTransform: "capitalize"
                }
            }
        }

    },
    modal__close__btn: {
        position: "absolute",
        top: 20,
        right: 30,
        border: "1px solid #2196f3",
        backgroundColor: "#2196f3",
        height: 25,
        minWidth: 50,
        borderRadius: 5,
        textAlign: "center",
        color: "white",
        cursor: "pointer",
        "&:hover": {
            border: "1px solid #2196f3",
            backgroundColor: "#fff",
            color: "#2196f3",
            transition: "0.5s"
        }
    }


});

const mapStateToProps = state => {
    return {
        pokemonDetail: state.pkDetail,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemonDetail: bindActionCreators(getPokemonDetail, dispatch),
        removePokemonDetail: bindActionCreators(removePokemonDetail, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PokeDetails));