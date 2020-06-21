var connection = require('../configs/database');
exports.get_all_employee = function ( req, res ) {
	var query = "SELECT id,first_name,last_name,email,role FROM users WHERE role=1";
	connection.query(query, function (err, result) {
        if (err) {
            res.send(err.sqlMessage);
        }else{
            res.send(result)
        }
    });
}

exports.delete_employee = function ( req, res ) {
	var id = req.params.id;
	if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide book id' });
    }
	var query = "DELETE FROM users WHERE id="+id+"";
	connection.query(query, function (err, result) {
        if (err) {
            res.json({err:sqlMessage, sql: query})
        }else{
            res.send("User successfully deleted")
        }
    });
}