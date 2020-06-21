var connection = require('../configs/database');

exports.get_reviews_by_employee_id = function ( req, res ) {
    var to_employee_id = req.params.to_employee_id;
    var query = `SELECT users.id, users.first_name, users.last_name, reviews.review
    FROM reviews
    INNER JOIN users ON reviews.from_employee_id=users.id
    WHERE reviews.to_employee_id=${to_employee_id}`
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err.sqlMessage);
        }else{
            res.send(result)
        }
    });
}

exports.review = function ( req, res ) {
    var id = req.params.id;
    var review = req.body.review;
    var query = `UPDATE reviews SET review="${review.toString()}" WHERE id=${id}`;
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err.sqlMessage);
        }else{
            res.send(result)
        }
    });
}

exports.assign = function ( req, res ) {
    var to_employee_id = req.body.to_employee_id;
    var from_employee_id = req.body.from_employee_id;
    var created_by = req.body.created_by;

    var query = "INSERT INTO reviews (to_employee_id,from_employee_id,created_by) VALUES('"+to_employee_id+"','"+from_employee_id+"','"+created_by+"')";
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err.sqlMessage);
        }
        if ( result.insertId > 0 ){
            res.status(201).json({
                "message": "Assigned successfully!"
            })
        }
    });
}

exports.all_from_employee_by_to_employee_id = function ( req, res ) {
    var to_employee_id = req.params.to_employee_id;
    var query = "SELECT from_employee_id FROM reviews WHERE to_employee_id="+to_employee_id;
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err.sqlMessage);
        }else{
            res.send(result)
        }
    });
}

exports.all_to_employee_by_from_employee_id = function ( req, res ) {
    var from_employee_id = req.params.from_employee_id;
    var query = `SELECT reviews.id, users.first_name, users.last_name, reviews.review
    FROM reviews
    INNER JOIN users ON reviews.to_employee_id=users.id
    WHERE reviews.from_employee_id=${from_employee_id}`
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err.sqlMessage);
        }else{
            res.send(result)
        }
    });
}

exports.dissociate_review = function ( req, res ) {
    var to_employee_id = req.params.to_employee_id;
    var from_employee_id = req.params.from_employee_id;

    var query = "DELETE FROM reviews WHERE to_employee_id="+to_employee_id+" AND from_employee_id="+from_employee_id;
	connection.query(query, function (err, result) {
        if (err) {
            res.json({err:sqlMessage, sql: query})
        }else{
            res.send("Successfully deleted")
        }
    });
}