
# Pokedex__App                                                                                                                        
![Pokedex App](https://cdn1.imggmi.com/uploads/2019/1/3/45be2b0a2e7bea86c4a0dd006f9b9da4-full.png)

This is a fully working React Web App with the following characteristics:
 - [Create-React-App](https://github.com/facebookincubator/create-react-app) for boilerplate
 -  [NodeJS](https://nodejs.org/en/download/)/[Express](https://expressjs.com/) for backend
 - [MySQL](https://www.mysql.com/) for connection DB
 - [Redux](https://redux.js.org/)  pattern for handling application-state
 - [React Router](https://github.com/ReactTraining/react-router)  for handling routes
 - [Material-UI](https://material-ui.com/)  for UI
 - [Redux-Thunk](https://github.com/reduxjs/redux-thunk)  for asynchronous tasks
## Clone or download
```terminal
$ git clone https://github.com/karo-zakaryan/Pokedex__App--ReactJS.git
```
# Usage(make it run on your machine)
- You need make the both the following two run.
## Prerequirements
- [MySQL](https://www.youtube.com/watch?v=WVrYdn67ws4)
- [Node](https://nodejs.org/en/download/)
- [npm](https://nodejs.org/en/download/package-manager/)
- [PokeApi](http://pokeapi.co) ([Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?utm_source=chrome-ntp-icon))
## Establishing database connections
The recommended way to establish a connection is this:
```js
const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize("pokedex_login", "root", "usbw", {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
```
# Database example
![Database example](https://cdn1.imggmi.com/uploads/2019/1/2/ae3e774172182c6c5861f1bd51b3ab5c-full.png)
## DB User Schema 
```js
const Sequelize = require("sequelize");
const db = require("../database/db");
module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
);
```
## Server-side usage(Port: 5000)
```terminal
$ cd server
$ npm i
$ npm run dev
```
## Client-side usage(Port: 3000)
```terminal
$ cd client
$ npm i
$ npm start
```
# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios: ^0.18.0 | bcrypt: 3.0.0
jwt-decode: ^2.2.0|body-parser: ^1.17.2
@material-ui/core: ^3.7.1 | cors: ^2.8.4
react: ^16.7.0 | nodemon: ^1.18.3
react-dom: ^16.7.0 | express: ^4.16.3
react-redux: ^6.0.0 | mysql: ^2.14.1
react-router-dom: ^4.3.1 | sequelize: ^4.38.0
redux: ^4.0.1 | passport: ^0.4.0
react-spinners: ^0.4.8 | passport-google-token: ^0.1.2
redux-thunk: ^2.3.0 | express-jwt: ^5.3.1
react-google-login: ^4.0.1 | express-server-utils: ^1.1.0
react-easy-chart: ^1.0.0 | debug: ^4.1.1

# Screenshots of this project
User can sign in or sign up


![
](https://cdn1.imggmi.com/uploads/2019/1/3/5bdb838f2ed38c9750eb48e73803fe43-full.png)



After signing in user can _to_ look up statistics and information for over 800 Pokemon.

![
](https://cdn1.imggmi.com/uploads/2019/1/3/d3555d2ada527ee4c8b5d4691bbebd7f-full.png)



![
](https://cdn1.imggmi.com/uploads/2019/1/3/c30b416e9f0b0a1eefd19d31d55c562d-full.png)



![
](https://cdn1.imggmi.com/uploads/2019/1/3/fb531acf09e9a5a73e8e8b71ef1f9e8c-full.png)

## Author
[Karo Zakaryan](https://github.com/karo-zakaryan)

## License
[MIT](https://github.com/karo-zakaryan/Pokedex__App--ReactJS/blob/master/LICENSE)
