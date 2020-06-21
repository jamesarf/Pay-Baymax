var connection = require('../configs/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

//function for signin purpose
exports.signin = function(req, res) {
    //getting email and password value from request
    var email = req.body.email ;
    var password = req.body.password ;

    var query = "SELECT * FROM users WHERE email='"+email+"' LIMIT 1";
    connection.query(query, function (err, result, fields) {
        if ( result.length > 0 ){
            bcrypt.compare(password, result[0]['password'], function(err, matched) {
                if ( matched ){
                    delete result[0].password;
                    res.send(result[0]);
                }else{
                    res.send("Password not matched!");
                }
            });
        }else{
            res.send("User not found!");
        }
    });
};

//function for signup purpose
exports.signup = function(req, res) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;


    // res.send("asdfkdsjf alskdjfds");

    bcrypt.hash(password, saltRounds, function(err, password_hash) {
        var query = "INSERT INTO users (first_name,last_name,email,password,role) VALUES('"+first_name+"','"+last_name+"','"+email+"','"+password_hash+"','"+role+"')";
        connection.query(query, function (err, result) {
            
            if (err) {
                res.send(err.sqlMessage);
            }
            if ( result.insertId > 0 ){
                res.status(201).json({
                    "message": "User created successfully!"
                })
            }
        });
    });

};