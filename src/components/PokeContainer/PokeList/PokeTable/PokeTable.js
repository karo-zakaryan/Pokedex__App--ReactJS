import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Paper,
    Modal,
    withStyles,
    Typography
} from '@material-ui/core';
import PokeTableHead from "./PokeTableHead/PokeTableHead";
import DataManager from "../../../../managers/DataManager/DataManager";
import noImage from "../../../../assets/no__img.png";

class PokeTable extends Component {
    state = {
        order: 'asc',
        orderBy: 'name',
        page: 0,
        rowsPerPage: 10,
        isShow: false
    };

    handleOpen = () => {
        this.setState({isShow: !this.state.isShow});
    };

    handleClose = () => {
        this.setState({isShow: !this.state.isShow});
    };

    handleSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = e => {
        this.setState({rowsPerPage: e.target.value});
    };

    handleClick = pokemonId => {
        this.handleOpen();
        console.log(pokemonId);
    };

    addDefaultSrc = e => {
        e.target.src = noImage;
    };

    render() {
        const {classes, pokeList} = this.props;
        const {order, orderBy, rowsPerPage, page} = this.state;

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="pokemonsTable">
                        <PokeTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleSort}
                            rowCount={pokeList.length}
                        />
                        <TableBody>
                            {DataManager.stableSort(pokeList, DataManager.getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((pokemon, index) => {
                                    const pokemonId = DataManager.getPokemonId(pokemon.url);
                                    const pokemonImg = DataManager.getPokemonImg(pokemonId);
                                    const pokemonName = DataManager.capitalize(pokemon.name);

                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => this.handleClick(pokemonId)}
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell>
                                                {pokemonName}
                                            </TableCell>

                                            <TableCell align="left">
                                                <img
                                                    alt="sprite"
                                                    src={pokemonImg}
                                                    onError={this.addDefaultSrc}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    className={classes.pagination}
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={pokeList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.isShow}
                    onClose={this.handleClose}
                >
                    <div className={classes.modal}>
                        <Typography variant="h6" id="modal-title">
                            Pokemon details
                        </Typography>
                    </div>
                </Modal>
            </Paper>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        "& div": {
            width: "auto",
            height: "auto"
        },
        "& img": {
            width: 60,
            height: 60
        }
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    pagination: {
        "& div": {
            width: "auto"
        },
        "& svg": {
            top: "10%",
            left: "50%"
        }

    },
    modal: {
        position: 'fixed',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        display: "flex",
        width: "calc(100% - 700px)",
        height: 270,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 50,
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
});

export default withStyles(styles)(PokeTable);