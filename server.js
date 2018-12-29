let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
let port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

let Users = require('./routes/Users');

app.use('/users', Users);

app.listen(port, () => {
    console.log("Server is running on port: " + port)
});