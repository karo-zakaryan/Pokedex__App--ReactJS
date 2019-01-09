import React from 'react';
import Header from "./components/Header/Header";
import PokeContainer from "./components/PokeContainer/PokeContainer";
import {Redirect, Route, Switch} from "react-router-dom";
// import SignIn from "./components/SignIn/SignIn";
// import SignUp from "./components/SignUp/SignUp";
import routePaths from "./constKeys/routePaths";
import Page404 from "./components/Page404/Page404";


const PokeDexApp = () => {
    // const isUserLoggedIn = localStorage.usertoken;
    // const space = /\s/.test(isUserLoggedIn);
    // const signIn = <Redirect to={routePaths.signIn}/>;
    // const pokemonPage = <Redirect to={routePaths.pokemonPage}/>;

    return (
        <div>
            { /*<Switch>
                 <Route exact path="/" render={() => (
                    isUserLoggedIn && !space ? (pokemonPage) : (<SignIn/>))}/>

                < Route exact path={routePaths.signIn} render={() => (
                    isUserLoggedIn && !space ? (pokemonPage) : (<SignIn/>))}/>

                    <Route exact path={routePaths.signUp} render={() => (
                    isUserLoggedIn && !space ? (pokemonPage) : (<SignUp/>))}/>


                <Route path={routePaths.pokemonPage} render={() => (
                    // isUserLoggedIn && !space ? (
                    <>*/}
            <Header/>
            <PokeContainer/>
            {/* </>
                )}/>

                 ) : (signIn))}/>

                <Page404/>
            </Switch>
            */}
        </div>
    );
};

export default PokeDexApp;