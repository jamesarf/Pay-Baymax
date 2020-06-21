var mysql = require('mysql');

// var connectionString = 'mysql://portonics:free2rhyme@localhost/common?charset=utf8_general_ci&timezone=-0700';
// var connection= mysql.createConnection(connectionString);

var connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "123456",
    database:"paybaymax",
    // port:3308
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection;