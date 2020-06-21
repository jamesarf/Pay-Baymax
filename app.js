var express = require("express");
var app = express();

const bodyParser = require('body-parser');

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routers = require('./src/routes/routes');
app.use('/', routers);


app.listen(5000, () => {
    console.log("Server running on port 5000");
});