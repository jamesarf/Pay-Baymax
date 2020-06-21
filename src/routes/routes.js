var express = require('express');
var router = express.Router();

// Require controller modules.
var auth_controller = require('../controllers/AuthController');
var review_controller = require('../controllers/ReviewController');
var employee_controller = require('../controllers/EmployeeController');

//routers for signin and signup
router.post("/signup", auth_controller.signup);
router.post("/signin", auth_controller.signin);


router.get("/employees", employee_controller.get_all_employee);
router.delete("/employee/:id", employee_controller.delete_employee); 

router.get("/reviews/:to_employee_id", review_controller.get_reviews_by_employee_id);
router.put("/reviews/:id", review_controller.review);

//admin can assign a employee to review another employee
router.post("/reviews/assign", review_controller.assign);
router.get("/reviews/to_employees/:from_employee_id", review_controller.all_to_employee_by_from_employee_id);
router.get("/reviews/from_employees/:to_employee_id", review_controller.all_from_employee_by_to_employee_id);
router.delete("/reviews/dissociate/:to_employee_id/:from_employee_id", review_controller.dissociate_review); 



module.exports = router;