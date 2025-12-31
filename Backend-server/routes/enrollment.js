const express = require('express');
const enrollmentController = require('../controllers/enrollment');
const auth = require("../auth");

const router = express.Router();

const { verify } = auth;

//[SECTION] Route to enroll user to a course
router.post('/enroll', verify, enrollmentController.enroll);

//[SECTION] Route to get the user's enrollements array
router.get('/get-enrollments', verify, enrollmentController.getEnrollments);

router.put(
    "/admin/update-status",
    verify,
    enrollmentController.updateEnrollmentStatus
);


module.exports = router; 