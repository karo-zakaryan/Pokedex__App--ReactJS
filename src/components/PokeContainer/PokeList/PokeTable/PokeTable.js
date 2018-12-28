import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TablePagination,
    Paper,
    withStyles,
} from '@material-ui/core';
import PokeTableHead from "./PokeTableHead/PokeTableHead";
import DataManager from "../../../../managers/DataManager/DataManager";
import PokeDetails from "../../PokeDetails/PokeDetails";

class PokeTable extends Component {
    state = {
        order: 'desc',
        orderBy: 'id',
        page: 0,
        rowsPerPage: 10,
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
                                        <PokeDetails key={index} pokemonId={pokemonId} pokemonImg={pokemonImg}
                                                     pokemonName={pokemonName}/>
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
            width: 50,
            height: 40,
            verticalAlign: "middle"
        },
        "& td": {
            padding: "2%",
            fontSize: "1rem",
            fontWeight: "bold"
        }
    },
    table: {
        minWidth: 1020,
        "& th": {
            fontSize: 25,
            fontStyle: "oblique"
        }
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

    }
});


export default withStyles(styles)(PokeTable);